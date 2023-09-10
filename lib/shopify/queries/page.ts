import imageFragment from '../fragments/image';
import seoFragment from '../fragments/seo';

const pageFragment = /* GraphQL */ `
  fragment page on Page {
    ... on Page {
      id
      title
      handle
      body
      bodySummary
      seo {
        ...seo
      }
      createdAt
      updatedAt
    }
  }
  ${seoFragment}
`;

export const getPageQuery = /* GraphQL */ `
  query getPage($handle: String!) {
    pageByHandle(handle: $handle) {
      ...page
    }
  }
  ${pageFragment}
`;

export const getBlogQuery = /* GraphQL */ `
  query getBlog($handle: String!) {
    blog(handle: "lifestyle") {
      articleByHandle(handle: $handle) {
        title
        contentHtml
        image {
          ...image
        }
        seo {
          ...seo
        }
      }
    }
  }

  ${seoFragment}
  ${imageFragment}
`;

export const getPagesQuery = /* GraphQL */ `
  query getPages {
    pages(first: 100) {
      edges {
        node {
          ...page
        }
      }
    }
  }
  ${pageFragment}
`;
