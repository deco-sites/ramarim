import { AppContext } from "apps/vtex/mod.ts";

interface Props {
    acronym: string;
    data: Record<string, unknown>;
}

interface CreateNewDocument {
    Id: string;
    Href: string;
    DocumentId: string;
}

/**
 * @docs https://developers.vtex.com/docs/api-reference/masterdata-api#post-/api/dataentities/-acronym-/documents
 */
const action = async (
    props: Props,
    ctx: AppContext,
): Promise<CreateNewDocument> => {
  const { vcsDeprecated } = ctx;
  const { acronym, data } = props;

  const response = await vcsDeprecated
    [`POST /api/dataentities/:acronym/documents`](
      { acronym },
      {
        body: data,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      },
    );

  return response.json();
};

export default action;