import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';



export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps};
    }

    render() {
        return (
            <html lang="en">
                <Head>
                    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=no"/>
                    <meta id="description" name="description" content="Portefini makes menswear shopping effortless! Find your occasions or styles, browse inspiring outfits styled by fashion Instagram influencers, and buy the clothes from your favorite retailers.."/>
                    <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i|Caveat:700" rel="stylesheet"/>
                    <link rel="shortcut icon" href="/static/favicon.ico"/>
                </Head>
                <body>
                    <Main/>
                    <div className="modal"/>
                    <NextScript/>
                </body>
            </html>
        );
    }
}
