/**
 * External dependencies
 */

import debugFactory from 'debug';

const debug = debugFactory( 'calypso:followers-actions' );

/**
 * Internal dependencies
 */
import wpcom from 'calypso/lib/wp';
import { requestRemoveFollower, successRemoveFollower, failRemoveFollower } from '../actions';

function removeFollower( siteId, follower ) {
	return ( dispatch ) => {
		debug( 'removing follower', follower, siteId );
		dispatch( requestRemoveFollower( siteId, follower ) );
		wpcom
			.undocumented()
			.site( siteId )
			.removeFollower( follower.ID )
			.then( ( data ) => dispatch( successRemoveFollower( siteId, follower, data ) ) )
			.catch( ( error ) => dispatch( failRemoveFollower( siteId, follower, error ) ) );
	};
}

export default removeFollower;