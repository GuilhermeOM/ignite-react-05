// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/** Content for Post documents */
interface BlogpostsDocumentData {
    /**
     * title field in *Post*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: blogposts.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismicT.KeyTextField;
    /**
     * subtitle field in *Post*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: blogposts.subtitle
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    subtitle: prismicT.KeyTextField;
    /**
     * author field in *Post*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: blogposts.author
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    author: prismicT.KeyTextField;
    /**
     * banner field in *Post*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: blogposts.banner
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    banner: prismicT.ImageField<never>;
    /**
     * content field in *Post*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: blogposts.content[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    content: prismicT.GroupField<Simplify<BlogpostsDocumentDataContentItem>>;
}
/**
 * Item in Post → content
 *
 */
export interface BlogpostsDocumentDataContentItem {
    /**
     * header field in *Post → content*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: blogposts.content[].header
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    header: prismicT.KeyTextField;
    /**
     * body field in *Post → content*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: blogposts.content[].body
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    body: prismicT.RichTextField;
}
/**
 * Post document from Prismic
 *
 * - **API ID**: `blogposts`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogpostsDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<BlogpostsDocumentData>, "blogposts", Lang>;
export type AllDocumentTypes = BlogpostsDocument;
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
    }
    namespace Content {
        export type { BlogpostsDocumentData, BlogpostsDocumentDataContentItem, BlogpostsDocument, AllDocumentTypes };
    }
}