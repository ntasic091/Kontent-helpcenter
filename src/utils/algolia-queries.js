const pageQuery = `
{
  allKontentItemKnowledgeCenterMarkdownPage {
    nodes {
      elements {
        body {
          value
        }
        subtitle {
          value
        }
        subcategoryname {
          value
        }
        permalink {
          value
        }
        pagename {
          value
        }
        categoryname {
          value
        }
      }
      id
    }
  }
  allKontentItemReleaseNotesPage {
    nodes {
      elements {
        subtitle {
          value
        }
        pagename {
          value
        }
      }
    }
  }
  allKontentItemPostWhatsnew {
    nodes {
      elements {
        body {
          value
        }
        pagename {
          value
        }
        subtitle {
          value
        }
        permalink {
          value
        }
      }
    }
  }
}
`

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) =>
      data.allKontentItemKnowledgeCenterMarkdownPage.nodes,
  },
]

module.exports = queries
