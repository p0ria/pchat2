import React, { useEffect } from 'react';
import './HomePage.scss';
import Sidebar from '../../app-components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { actionAudiencesChanged, actionGetAllAudiences } from '../../state/audience/audience.actions';
import { selectToken } from '../../state/login/login.selectors';
import { createWsClient } from '../../services/client';
import { AUDIENCES_CHANGED_SUBSCRIPTION } from '../../graphql/subscriptions';
import { AUDIENCES_QUERY, ME_QUERY } from '../../graphql/queries';
import { actionSubscribeToWS } from '../../state/app/app.actions';

export default () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    dispatch(actionSubscribeToWS(dispatch));
  }, [])

  return (
    <div className="HomePage">
      <Sidebar />
      <div className="HomePage-Right">

      </div>
    </div>
  )
}

async function callMeQuery(token: any, dispatch) {
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