import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './HomePage.scss';
import Sidebar from '../../app-components/Sidebar/Sidebar';
import { GraphQLClient } from 'graphql-request';
import { selectToken } from '../../state/login/login.selectors';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_MESSAGE_MUTATION } from '../../graphql/mutations';
import { AUDIENCES_QUERY, ME_QUERY } from '../../graphql/queries';
import { actionGetAllAudiences } from '../../state/audience/audience.actions';


export default () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  useEffect(() => {
    //callMeQuery(token);
    dispatch(actionGetAllAudiences());
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
  // const client = new GraphQLClient('http://localhost:4000/graphql', {
  //   headers: { authorization: token }
  // });
  // const variables = {
  //   audienceId: '5f820c23730a153f94da74b2',
  //   type: 'TEXT',
  //   value: Buffer.from('SALAM DONYA!').toString('base64')
  // }
  // const data = await client.request(CREATE_MESSAGE_MUTATION, variables);

  // const data = await client.request(AUDIENCES_QUERY);
  // console.log({ data });
}