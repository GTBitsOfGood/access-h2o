import React from "react";
import PropTypes from "prop-types";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { getCurrentUser } from "../actions/User";
import urls from "../../utils/urls";

const MyApp = ({ Component, pageProps, currentUser }) => (
  <>
    <Head>
      <title>AccessH2O</title>
    </Head>
    <div>
      {/* <Header loggedIn={currentUser != null} currentRoute={router.asPath} /> */}
      <div>
        <Component {...pageProps} currentUser={currentUser} />
      </div>
    </div>
  </>
);

MyApp.getInitialProps = async (appContext) => {
  const { res } = appContext.ctx;

  const appProps = await App.getInitialProps(appContext);

  const cookies = appContext.ctx.req ? appContext.ctx.req.headers.cookie : null;

  const route = appContext.ctx.asPath;

  return getCurrentUser(cookies)
    .then((user) => {
      if (route === "/login") {
        if (res) {
          res.writeHead(301, { Location: urls.pages.app.home });
          res.end();
        } else {
          return Router.replace(urls.pages.app.home);
        }
      }

      return {
        ...appProps,
        currentUser: user,
      };
    })
    .catch(() => {
      if (route.startsWith("/test")) {
        if (res) {
          res.writeHead(301, { Location: urls.pages.index });
          res.end();
        } else {
          return Router.replace(urls.pages.index);
        }
      }

      return appProps;
    });
};

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};

MyApp.defaultProps = {
  currentUser: null,
};

export default MyApp;