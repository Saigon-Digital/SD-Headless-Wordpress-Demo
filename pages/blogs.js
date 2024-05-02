import  SEO  from '@/components/SEO';
import { Footer, Headers } from '@/components/Footer'
import {  Header } from '@/components/Header'
import { gql } from '@apollo/client'
import { createApolloClient } from "@faustwp/core/dist/cjs/client";
import Link from 'next/link';

import React from 'react'
  
  export default function Blogs({postsData, loading}) {
    return (
        <>
        <SEO/>
        <Header/>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {postsData?.map((post) => (
              <Link href={`/${post?.slug}`} key={post?.title} className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                  <img
                    src={post?.featuredImage?.node?.sourceUrl}
                    alt=""
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time dateTime={post.datetime} className="text-gray-500">
                      {post.date}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={post.href}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
      </>
    )
  }
  
  export const getStaticProps = async () => {
    const client = createApolloClient();
  
    const { data, loading } = await client.query({
      query: Blogs.query,
    });
   
  
    const posts = data?.posts?.nodes;
  
  
    return {
      props: {
        postsData:posts || null,
       loading
      },
    };
  };
  
  Blogs.query = gql`
    query Blogs {
        posts{
            nodes{
              featuredImage{
                node{
                  sourceUrl
                }
              }
              title
              content
              slug
            }
        }
    }
  `;
  