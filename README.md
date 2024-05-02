<a aria-label="@faustwp/core Downloads" href="https://saigon.digital" target="_blank"> 
  <img style="margin-top: 20px" alt="" src="https://i.ibb.co/0VFG2s6/Cover-1.png"> 
</a>

<p align="center">
  <a aria-label="@faustwp/core Downloads" href="https://www.npmjs.com/package/@faustwp/core">
    <img alt="" src="https://img.shields.io/npm/dw/@faustwp/core?color=7e5cef&style=for-the-badge&label=@faustwp/core">
  </a>
<!--  -->
  <a aria-label="@faustwp/cli Downloads" href="https://www.npmjs.com/package/@faustwp/cli">
    <img alt="" src="https://img.shields.io/npm/dw/@faustwp/cli?color=7e5cef&style=for-the-badge&label=@faustwp/cli">
  </a>
<!--  -->
  <a aria-label="License" href="https://github.com/wpengine/faustjs/blob/canary/LICENSE">
    <img alt="" src="https://img.shields.io/npm/l/@faustjs/core?color=7e5cef&style=for-the-badge">
  </a>
</p>

## Introduction [![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#introduction)

Faust.js is a framework for building front-end applications for headless WordPress sites. Faust.js provides tooling to reduce the pains of building a headless WordPress site (namely around data fetching, authentication, previews, and SSR/SSG) while offering a pleasant experience for both developers and publishers.

This Demo from Saigon Digital extend Faust js function by add the ACF block builder that allows user/editor to build flexible and customizable content structures within their Wordpress content editor.

![](https://i.ibb.co/xmZC9NP/image.png)

## System Requirements [![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#introduction)

- Node.js v16.0.0 or newer (v16.8.0 when using Next.js 13 and v18.17 when using Next.js 14).
- MacOS, Windows (including WSL), and Linux are supported.

## Getting Started [![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#introduction)

Faust.js aims to be framework agnostic, so it can be used with any front-end framework. Visit the guides below for a starting point:

1. Install NPM packages

   ```sh
   yarn install
   ```

2. Add env variable `.env`

   ```sh
   NEXT_PUBLIC_WORDPRESS_URL = https://your-wp-endpoint
   FAUST_SECRET_KEY = your-faust-serect-key
   ```

5. Run app

   ```sh
     yarn dev
   ```


## Usage [![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#introduction)

The following is a quick explaination of the major directories in the codebase.

### `/components`

This folder contains the various components that all pages and templates use. They are highly re-usable and for purely presentational purposes.

Each components will includes styling by Taillwind CSS, Query fragment of component so you can handle everything you need one place.

### `fragments`

This folder contains individual GraphQL fragments that are common between queries.

### `/function`

Includes a helpful transfrom function like return block by name, generator prebuild data, replace path,...

### `/pages`

This folder contains the Next.js file based routes that are used to render the associated pages.

### `/wp-templates`

Contains templates for programmatically creating pages from Wordpress pages CMS.

### `/faust.config.js`

These file allow customization/extension of default Faust settings affecting pieces of the site. More information [Configuring a Faust Plugin](https://faustjs.org/reference/configuring-a-faust-plugin)

## Documentation [![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#introduction)

Visit [https://faustjs.org/docs/getting-started](https://faustjs.org/docs/getting-started) to view the full documentation.

## WordPress Plugin (FaustWP)

There are two key parts to Faust.js: the NPM packages and the WordPress plugin. To take full advantage of headless, you will need to install the plugin in addition to the npm packages.

You can download and install FaustWP from the [WordPress Plugin Directory](https://wordpress.org/plugins/faustwp/), or by using the zip linked below.

[📥 Download Latest Version](https://wordpress.org/plugins/faustwp/)

