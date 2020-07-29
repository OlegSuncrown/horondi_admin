import React, { useCallback, useMemo } from 'react';
import { Editable, withReact, Slate } from 'slate-react';
import isHotkey from 'is-hotkey';
import { FormControl, Paper, TextField, Grid } from '@material-ui/core';
import { withHistory } from 'slate-history';
import { useDispatch, useSelector } from 'react-redux';
import { createEditor } from 'slate';
import { useStyles } from './news-add.styles';
import { SaveButton } from '../../../components/buttons';
import { addArticle } from '../../../redux/news/news.actions';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';
import useNewsHandlers from '../../../utils/use-news-handlers';
import useEditorOperations from '../../../utils/use-editor-operations';
import Toolbar from '../../../components/editor/toolbar';
import { BlockButton, MarkButton } from '../../../components/editor/buttons';
import Element from '../../../components/editor/element';
import Leaf from '../../../components/editor/leaf';

const { languages } = config;

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
};

const NewsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ News }) => News.newsLoading);
  const {
    // deserializeHTML,
    serializeToHTML,
    toggleMark
  } = useEditorOperations();
  const ukRenderElement = useCallback((props) => <Element {...props} />, []);
  const ukRenderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const ukEditor = useMemo(() => withHistory(withReact(createEditor())), []);

  const enRenderElement = useCallback((props) => <Element {...props} />, []);
  const enRenderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const enEditor = useMemo(() => withHistory(withReact(createEditor())), []);

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

  const serializedUkText = serializeToHTML(ukText);
  const serializedEnText = serializeToHTML(enText);

  const newsSaveHandler = async (e) => {
    e.preventDefault();
    const news = {
      video: e.target.newsVideo.value,
      author: {
        name: [
          {
            lang: languages[0],
            value: e.target.ukAuthorName.value
          },
          {
            lang: languages[1],
            value: e.target.enAuthorName.value
          }
        ],
        image: {
          small: e.target.authorPhoto.value
        }
      },
      title: [
        {
          lang: languages[0],
          value: e.target.ukTitle.value
        },
        {
          lang: languages[1],
          value: e.target.enTitle.value
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
          medium: e.target.newsImage.value
        },
        additional: {
          large: 'Test_additional_photo'
        }
      },
      date: new Date().toISOString()
    };
    dispatch(addArticle(news));
  };

  const entertaimentOptions = [
    {
      id: 'authorPhoto',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Фото автора',
      authorPhoto,
      handler: (e) => setAuthorPhoto(e.target.value),
      required: true
    },
    {
      id: 'newsImage',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Головне зображення',
      newsImage,
      handler: (e) => setNewsImage(e.target.value),
      required: true
    },
    {
      id: 'newsVideo',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Посилання на відео',
      newsVideo,
      handler: (e) => setNewsVideo(e.target.value)
    }
  ];

  const ukNewsOptions = [
    {
      id: 'ukAuthorName',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Автор (укр.)',
      ukAuthorName,
      handler: (e) => ukSetAuthor(e.target.value)
    },
    {
      id: 'ukTitle',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Заголовок (укр.)',
      ukTitle,
      handler: (e) => ukSetTitle(e.target.value),
      required: true
    }
  ];

  const enNewsOptions = [
    {
      id: 'enAuthorName',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Автор (англ.)',
      enAuthorName,
      handler: (e) => enSetAuthor(e.target.value)
    },
    {
      id: 'enTitle',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Заголовок (англ.)',
      enTitle,
      handler: (e) => enSetTitle(e.target.value),
      required: true
    }
  ];

  const entertaimentInputs = entertaimentOptions.map(
    ({ id, className, variant, label, value, handler, required }) => (
      <TextField
        id={id}
        key={id}
        className={className}
        variant={variant}
        label={label}
        value={value}
        onChange={() => handler}
        required={required}
        multiline
        InputLabelProps={{
          classes: {
            root: classes.inputLabel,
            shrink: 'shrink'
          }
        }}
      />
    )
  );

  const ukNewsInputs = ukNewsOptions.map(
    ({ id, className, variant, label, value, handler, required }) => (
      <TextField
        id={id}
        key={id}
        className={className}
        variant={variant}
        label={label}
        value={value}
        onChange={() => handler}
        required={required}
        multiline
        InputLabelProps={{
          classes: {
            root: classes.inputLabel,
            shrink: 'shrink'
          }
        }}
      />
    )
  );

  const enNewsInputs = enNewsOptions.map(
    ({ id, className, variant, label, value, handler, required }) => (
      <TextField
        id={id}
        key={id}
        className={className}
        variant={variant}
        label={label}
        value={value}
        onChange={() => handler}
        required={required}
        multiline
        InputLabelProps={{
          classes: {
            root: classes.inputLabel,
            shrink: 'shrink'
          }
        }}
      />
    )
  );

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={newsSaveHandler}>
        <FormControl className={classes.newsAdd}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.newsItemAdd}>
                {entertaimentInputs}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.newsItemAdd}>
                {ukNewsInputs}
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
              <Paper className={classes.newsItemAdd}>
                {enNewsInputs}
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
          className={classes.saveButton}
          id='save'
          type='submit'
          title='Зберегти'
        />
      </form>
    </div>
  );
};

export default NewsAdd;
