import { User } from '@/models/user';
import { Block, List, ListItem, Navbar, Page } from 'framework7-react';

const RequestAndLoad = (props: { user: User }) => {
  const { user } = props;

  return (
    <Page>
      <Navbar title={`${user.firstName} ${user.lastName}`} backLink="Back" />
      <Block strong inset>
        {user.about}
      </Block>
      <List strong inset dividersIos>
        {user.links.map((link, index) => (
          <ListItem
            key={index}
            link={link.url}
            title={link.title}
            external
            target="_blank"
          ></ListItem>
        ))}
      </List>
    </Page>
  );
};

export default RequestAndLoad;
