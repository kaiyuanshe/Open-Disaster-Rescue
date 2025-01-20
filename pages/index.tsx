import { observer } from 'mobx-react';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import { formatDate } from 'web-utility';

import { GitCard } from '../components/Git/Card';
import { PageHead } from '../components/Layout/PageHead';
import { Disaster, DisasterModel } from '../models/Disaster';
import { i18n, t } from '../models/Translation';
import styles from '../styles/Home.module.less';
import { framework } from './api/home';

interface HomePageProps {
  disasters: Disaster[];
}

export const getServerSideProps = compose(
  cache(),
  errorLogger,
  translator(i18n),
  async () => {
    const disasters = await new DisasterModel().getList({}, 1, 3);

    return { props: { disasters } };
  },
);

const HomePage: FC<HomePageProps> = observer(({ disasters }) => (
  <Container as="main" className={styles.main}>
    <PageHead />

    <h1 className={`m-0 text-center ${styles.title}`}>
      {t('open_disaster_rescue')}
    </h1>

    <h2 className="my-4 text-center">{t('disaster_rescue_history')}</h2>
    <Row className="g-4" xs={1} sm={2} md={3}>
      {disasters.map(({ id, name, type, startedAt, endedAt }) => (
        <Col key={id + ''}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title as="h2" className="fs-4 mb-3">
                <Badge className="me-2">{type + ''}</Badge>
                <a href={`/disaster/${id}`} className="stretched-link">
                  {name + ''}
                </a>
              </Card.Title>
            </Card.Body>
            <Card.Footer className="text-center">
              {formatDate(+startedAt!, 'YYYY-MM-DD')} ~{' '}
              {formatDate(+endedAt!, 'YYYY-MM-DD')}
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>

    <h2 className="my-4 text-center">{t('upstream_projects')}</h2>
    <Row className="g-4" xs={1} sm={2} md={3}>
      {framework.map(
        ({ title, languages, tags, summary, link, repository }) => (
          <Col key={title}>
            <GitCard
              className={`h-100 ${styles.card}`}
              full_name={title}
              html_url={repository}
              homepage={link}
              languages={languages}
              topics={tags}
              description={summary}
            />
          </Col>
        ),
      )}
    </Row>
  </Container>
));

export default HomePage;
