import React, { Component } from "react";
import PropTypes from "prop-types";
import short from "shortid";
import { checkToken } from "../helpers/helpers";
import { Link } from "react-router-dom";
import { Button, Checkbox, message } from "antd";
import { connect } from "react-redux";
import { addBlog } from "../store/actions/actions";
import {
  faBold,
  faItalic,
  faCode,
  faUnderline,
  faHeading,
  faSave,
  faListUl,
  faListOl
} from "@fortawesome/free-solid-svg-icons";
import {
  Editor as DraftEditor,
  EditorState,
  RichUtils,
  convertToRaw
} from "draft-js";
import styles from "../CSS/create.styl";
import StyleButton from "./partials/StyleButton";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: null,
      hidden: false,
      session: false
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onChange = editorState => this.setState({ editorState });
  }
  componentDidMount() {
    // Validate User
    this.authorizeUser();
    // Load Data if draft prop exists.
    // if (this.state.session !== false && this.props.id) {
    //   // Continue
    //   const drafts = localStorage.getItem("drafts");

    // }
  }
  inlineStyles = [
    { name: "bold", type: "BOLD", icon: faBold, size: "1x" },
    { name: "italic", type: "ITALIC", icon: faItalic, size: "1x" },
    { name: "underline", type: "UNDERLINE", icon: faUnderline, size: "1x" },
    { name: "code", type: "CODE", icon: faCode, size: "1x" }
  ];
  blockStyles = [
    { name: "H1", type: "header-one", icon: faHeading, size: "1x" },
    { name: "H2", type: "header-two", icon: faHeading, size: "sm" },
    { name: "H3", type: "header-three", icon: faHeading, size: "xs" },
    { name: "UL", type: "unordered-list-item", icon: faListUl, size: "1x" },
    { name: "OL", type: "ordered-list-item", icon: faListOl, size: "1x" }
  ];
  authorizeUser = async () => {
    const isValid = await checkToken();
    if (isValid.error) {
      return this.setState({
        session: false
      });
    }
    this.setState({
      session: true
    });
  };
  saveContent = () => {
    // Grab the content to make the draft.
    const { title } = this.state;
    const content = this.state.editorState.getCurrentContent();

    // Stop saving if there is no title presented
    if (title === null || title === "") {
      return message.error("You cannot save this blog without a title.");
    }

    // Get Drafts (if it exists)
    const drafts =
      localStorage.getItem("drafts") === null
        ? []
        : JSON.parse(localStorage.getItem("drafts"));

    // Find a draft with the same name. Remove Duplicate.
    const updateDraft = drafts.filter(draft => draft.blogTitle !== title);

    // Add Draft To List
    updateDraft.unshift({
      ...convertToRaw(content),
      blogTitle: title,
      draft_id: short.generate(),
      author_id: this.props.match.params.id
    });

    // Set Item to localStorage
    localStorage.setItem("drafts", JSON.stringify(updateDraft));
    message.success("Saved successfully.");
  };

  onChangeInput = e => this.setState({ [e.target.name]: e.target.value });
  onCheckHidden = e => this.setState({ [e.target.name]: e.target.checked });
  renderUnauthorizedUser = () => (
    <div className={styles["session-main"]}>
      <h1>Your Session Has Ended.</h1>
      <Link to="/">Click here to login in.</Link>
    </div>
  );

  changeInlineStyle(style) {
    this.updateEditorState(
      RichUtils.toggleInlineStyle(this.state.editorState, style)
    );
  }
  onTabClick(e) {
    const maxDepth = 5;
    this.state.editorState(
      this.state.editorState,
      RichUtils.onTab(e, this.state.editorState, maxDepth)
    );
  }
  changeBlockStyle(style) {
    this.updateEditorState(
      RichUtils.toggleBlockType(this.state.editorState, style)
    );
  }

  updateEditorState = editorState => this.setState({ editorState });
  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  onSubmit = async e => {
    e.preventDefault();
    try {
      const { title, hidden } = this.state;
      const contentState = this.state.editorState.getCurrentContent();
      let draft = { content: convertToRaw(contentState) };
      draft.content = JSON.stringify(draft.content);
      // Add Blog to user
      const createBlog = await addBlog({
        title,
        hidden,
        content: draft.content
      });
      message.success("Blog submitted successfully");
      this.props.location.push("/");
    } catch (err) {
      message.error("Failed to add new blog. Please try again.");
    }
  };

  render() {
    return !this.state.session ? (
      this.renderUnauthorizedUser()
    ) : (
      <div className={styles["editor"]}>
        <div className={styles["editor__container"]}>
          <div className={styles["editor__title"]}>
            <input
              className={styles["input__title"]}
              type="text"
              name="title"
              placeholder="Title Goes Here"
              onChange={e => this.onChangeInput(e)}
            />
          </div>
          <div className={styles["editor__commands"]}>
            {this.inlineStyles.map((style, index) => (
              <StyleButton
                action={this.changeInlineStyle.bind(this, style.type)}
                icon={style.icon}
                sizes={style.size}
                key={index}
              />
            ))}
            <StyleButton
              action={this.saveContent.bind(this, this.state.title)}
              icon={faSave}
              sizes="1x"
            />
            <div className={styles["editor__commands-right"]}>
              {this.blockStyles.map((style, index) => (
                <StyleButton
                  action={this.changeBlockStyle.bind(this, style.type)}
                  icon={style.icon}
                  sizes={style.size}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className={styles["editor__main"]}>
            <DraftEditor
              editorState={this.state.editorState}
              onChange={this.updateEditorState.bind(this)}
              onTab={this.onTabClick.bind(this)}
              handleKeyCommand={this.handleKeyCommand.bind(this)}
              spellCheck="true"
              placeholder="What is on your mind?"
            />
          </div>
          <div className={styles["private__checked"]}>
            <Checkbox
              name="hidden"
              style={{ fontSize: "1rem" }}
              onChange={e => this.onCheckHidden(e)}
            >
              Make Blog Private?
            </Checkbox>
          </div>
          <div className={styles["editor__btn"]}>
            <Button type="primary" onClick={e => this.onSubmit(e)}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  addBlog
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Create);
