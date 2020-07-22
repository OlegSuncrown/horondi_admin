import { gql } from 'apollo-boost';
import { client } from '../../utils/client';

const getAllNews = () =>
  client
    .query({
      query: gql`
        {
          getAllNews {
            _id
            author {
              name {
                lang
                value
              }
              image {
                small
              }
            }
            title {
              lang
              value
            }
          }
        }
      `
    })
    .then((res) => res.data.getAllNews);

const getArticleById = (id) =>
  client
    .query({
      variables: { id },
      query: gql`
        query($id: ID!) {
          getNewsById(id: $id) {
            ... on News {
              __typename
              title {
                lang
                value
              }
              text {
                lang
                value
              }
              images {
                primary {
                  medium
                }
                additional {
                  large
                }
              }
              video
              author {
                name {
                  lang
                  value
                }
                image {
                  small
                }
              }
              date
            }
            ... on Error {
              __typename
              message {
                lang
                value
              }
              statusCode
            }
          }
        }
      `,
      fetchPolicy: 'no-cache'
    })
    .then((res) => res.data.getNewsById);

const deleteArticle = async (id) => {
  await client.mutate({
    variables: { id },
    mutation: gql`
      mutation($id: ID!) {
        deleteNews(id: $id) {
          ... on News {
            title {
              lang
            }
          }
          ... on Error {
            message {
              lang
            }
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  client.resetStore();
};

const createArticle = async (news) => {
  await client.mutate({
    mutation: gql`
      mutation($news: NewsInput!) {
        addNews(news: $news) {
          video
        }
      }
    `,
    variables: { news }
  });
  client.resetStore();
};

const updateArticle = async (id, news) => {
  await client.mutate({
    variables: {
      id,
      news
    },
    mutation: gql`
      mutation($id: ID!, $news: NewsInput!) {
        updateNews(id: $id, news: $news) {
          video
        }
      }
    `
  });
  client.resetStore();
};

export {
  getAllNews,
  deleteArticle,
  getArticleById,
  createArticle,
  updateArticle
};
