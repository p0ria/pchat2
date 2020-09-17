import React, { useEffect } from 'react';
import './HomePage.scss';
import Sidebar from '../../app-components/Sidebar/Sidebar';
import { GraphQLClient } from 'graphql-request';
import { selectToken } from '../../state/login/login.selectors';
import { useSelector } from 'react-redux';
import { CREATE_MESSAGE_MUTATION } from '../../graphql/mutations';


export default () => {
  const token = useSelector(selectToken);
  useEffect(() => {
    callMeQuery(token);
  }, [])

  return (
    <div className="HomePage">
      <Sidebar />
      <div className="HomePage-Right">

      </div>
    </div>
  )
}

async function callMeQuery(token: any) {
  const client = new GraphQLClient('http://localhost:4000/graphql', {
    headers: { authorization: token}
  });
  const variables = {
    type: 'TEXT',
    value: 'SALAM DONYA!'
  }
  const data = await client.request(CREATE_MESSAGE_MUTATION, variables);
  console.log({data});
}