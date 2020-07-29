import React, { useEffect, useCallback, useMemo } from 'react';
import { Paper, TextField, FormControl, Grid } from '@material-ui/core';
import { Editable, withReact, Slate } from 'slate-react';
import isHotkey from 'is-hotkey';
import { withHistory } from 'slate-history';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { createEditor } from 'slate';
import { useStyles } from './news-details.styles';
import { SaveButton } from '../../../components/buttons';
import { config } from '../../../configs';
import useNewsHandlers from '../../../utils/use-news-handlers';
import { BlockButton, MarkButton } from '../../../components/editor/buttons';
import useEditorOperations from '../../../utils/use-editor-operations';
import Toolbar from '../../../components/editor/toolbar';
import Element from '../../../components/editor/element';
import Leaf from '../../../components/editor/leaf';
import LoadingBar from '../../../components/loading-bar';
import { getArticle, updateArticle } from '../../../redux/news/news.actions';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
};

const { languages } = config;
const NewsDetails = ({ match }) => {
  const {
    deserializeHTML,
    serializeToHTML,
    toggleMark
  } = useEditorOperations();
  const ukRenderElement = useCallback((props) => <Element {...props} />, []);
  const ukRenderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const ukEditor = useMemo(() => withHistory(withReact(createEditor())), []);

  const enRenderElement = useCallback((props) => <Element {...props} />, []);
  const enRenderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const enEditor = useMemo(() => withHistory(withReact(createEditor())), []);
  const dispatch = useDispatch();
  const { loading, newsArticle } = useSelector(({ News }) => ({
    loading: News.loading,
    newsArticle: News.newsArticle
  }));
  const classes = useStyles();

  const {
    authorPhoto,
    newsImage,
    newsVideo,
    ukAuthorName,
    ukText,
    ukTitle,
    enAuthorName,
    enText,
    enTitle,
    setAuthorPhoto,
    setNewsImage,
    setNewsVideo,
    ukSetAuthor,
    ukSetText,
    ukSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle
  } = useNewsHandlers();

  const { id } = match.params;
  useEffect(() => {
    dispatch(getArticle(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (newsArticle !== null) {
      const deserializedUkText = deserializeHTML(newsArticle.text[0].value);
      const deserializedEnText = deserializeHTML(newsArticle.text[1].value);
      setAuthorPhoto(newsArticle.author.image.small);
      setNewsImage(newsArticle.images.primary.medium);
      setNewsVideo(newsArticle.video);

      ukSetAuthor(newsArticle.author.name[0].value);
      ukSetText(deserializedUkText);
      ukSetTitle(newsArticle.title[0].value);

      enSetAuthor(newsArticle.author.name[1].value);
      enSetText(deserializedEnText);
      enSetTitle(newsArticle.title[1].value);
    }
  }, [
    newsArticle,
    setAuthorPhoto,
    setNewsImage,
    setNewsVideo,
    ukSetAuthor,
    ukSetText,
    ukSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle
  ]);

  const serializedUkText = serializeToHTML(ukText);
  const serializedEnText = serializeToHTML(enText);

  const newsSaveHandler = async (e) => {
    e.preventDefault();
    const newArticle = {
      video: newsVideo,
      author: {
        name: [
          {
            lang: languages[0],
            value: ukAuthorName
          },
          {
            lang: languages[1],
            value: enAuthorName
          }
        ],
        image: {
          small: authorPhoto
        }
      },
      title: [
        {
          lang: languages[0],
          value: ukTitle
        },
        {
          lang: languages[1],
          value: enTitle
        }
      ],
      text: [
        {
          lang: languages[0],
          value: serializedUkText
        },
        {
          lang: languages[1],
          value: serializedEnText
        }
      ],
      images: {
        primary: {
          medium: newsImage
        }
      }
    };
    dispatch(updateArticle({ id, newArticle }));
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.detailsContainer}>
      <form className={classes.form} onSubmit={newsSaveHandler}>
        <FormControl className={classes.newsDetails}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.newsItemUpdate}>
                <TextField
                  id='authorPhoto'
                  className={classes.textField}
                  variant='outlined'
                  label='Фото автора'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={authorPhoto}
                  onChange={(e) => setAuthorPhoto(e.target.value)}
                  required
                />
                <TextField
                  id='newsImage'
                  className={classes.textField}
                  variant='outlined'
                  label='Головне зображення'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={newsImage}
                  onChange={(e) => setNewsImage(e.target.value)}
                  required
                />
                <TextField
                  id='newsVideo'
                  className={classes.textField}
                  variant='outlined'
                  label='Посилання на відео'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={newsVideo}
                  onChange={(e) => setNewsVideo(e.target.value)}
                  required
                />
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.newsItemUpdate}>
                <TextField
                  id='ukAuthorName'
                  className={classes.textField}
                  variant='outlined'
                  label='Автор (укр.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={ukAuthorName}
                  onChange={(e) => ukSetAuthor(e.target.value)}
                  required
                />
                <TextField
                  id='ukTitle'
                  className={classes.textField}
                  variant='outlined'
                  label='Заголовок (укр.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={ukTitle}
                  onChange={(e) => ukSetTitle(e.target.value)}
                  required
                />
                <Slate
                  editor={ukEditor}
                  value={ukText}
                  onChange={(value) => ukSetText(value)}
                >
                  <Toolbar>
                    <MarkButton format='bold' icon='format_bold' />
                    <MarkButton format='italic' icon='format_italic' />
                    <MarkButton format='underline' icon='format_underlined' />
                    <MarkButton format='code' icon='code' />
                    <BlockButton format='heading-one' icon='looks_one' />
                    <BlockButton format='heading-two' icon='looks_two' />
                    <BlockButton format='block-quote' icon='format_quote' />
                    <BlockButton
                      format='numbered-list'
                      icon='format_list_numbered'
                    />
                    <BlockButton
                      format='bulleted-list'
                      icon='format_list_bulleted'
                    />
                  </Toolbar>
                  <Editable
                    className={classes.editable}
                    renderElement={ukRenderElement}
                    renderLeaf={ukRenderLeaf}
                    placeholder='Enter some rich text…'
                    spellCheck
                    autoFocus
                    onKeyDown={(event) => {
                      for (let hotkey = 0; hotkey < HOTKEYS.length; hotkey++) {
                        if (isHotkey(hotkey, event)) {
                          event.preventDefault();
                          const mark = HOTKEYS[hotkey];
                          toggleMark(ukEditor, mark);
                        }
                      }
                    }}
                  />
                </Slate>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.newsItemUpdate}>
                <TextField
                  id='enAuthorName'
                  className={classes.textField}
                  variant='outlined'
                  label='Автор (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={enAuthorName}
                  onChange={(e) => enSetAuthor(e.target.value)}
                  required
                />
                <TextField
                  id='enTitle'
                  className={classes.textField}
                  variant='outlined'
                  label='Заголовок (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={enTitle}
                  onChange={(e) => enSetTitle(e.target.value)}
                  required
                />
                <Slate
                  editor={enEditor}
                  value={enText}
                  onChange={(value) => enSetText(value)}
                >
                  <Toolbar>
                    <MarkButton format='bold' icon='format_bold' />
                    <MarkButton format='italic' icon='format_italic' />
                    <MarkButton format='underline' icon='format_underlined' />
                    <MarkButton format='code' icon='code' />
                    <BlockButton format='heading-one' icon='looks_one' />
                    <BlockButton format='heading-two' icon='looks_two' />
                    <BlockButton format='block-quote' icon='format_quote' />
                    <BlockButton
                      format='numbered-list'
                      icon='format_list_numbered'
                    />
                    <BlockButton
                      format='bulleted-list'
                      icon='format_list_bulleted'
                    />
                  </Toolbar>
                  <Editable
                    className={classes.editable}
                    renderElement={enRenderElement}
                    renderLeaf={enRenderLeaf}
                    placeholder='Enter some rich text…'
                    spellCheck
                    autoFocus
                    onKeyDown={(event) => {
                      for (let hotkey = 0; hotkey < HOTKEYS.length; hotkey++) {
                        if (isHotkey('shift+enter', event)) {
                          event.preventDefault();
                          console.log('hi');
                        }
                        if (isHotkey(hotkey, event)) {
                          event.preventDefault();
                          const mark = HOTKEYS[hotkey];
                          toggleMark(enEditor, mark);
                        }
                      }
                    }}
                  />
                </Slate>
              </Paper>
            </Grid>
          </Grid>
        </FormControl>
        <SaveButton
          id='save'
          type='submit'
          title='Зберегти'
          className={classes.saveButton}
        />
      </form>
    </div>
  );
};

NewsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(NewsDetails);
