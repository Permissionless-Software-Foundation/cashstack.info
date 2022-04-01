/* eslint-disable */

import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'
import Link from '@docusaurus/Link'
import bookIcon from '../../../static/img/book-icon.png'

const FeatureList = [
  {
    title: 'Written Documentation',
    // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    img: bookIcon,
    description: (
      <>
        <div>

            Read and digest our written documentation at your own speed.

        </div>
        <div className={styles.buttons}>
          <Link
            className='button button--secondary button--lg'
            to='/docs/intro'
          >
            Read Docs
          </Link>
        </div>
      </>
    )
  }
]

function Feature ({ img, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <img src={img} />
      </div>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures () {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
