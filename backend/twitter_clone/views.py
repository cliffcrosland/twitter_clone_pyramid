from pyramid.view import view_config

from .models import (
    DBSession,
    Tweet,
    User,
    )


def get_logged_in_user(request):
    return DBSession.query(User).filter_by(handle='cliffcrosland').one()


def get_tweet_feed_dict_for_user(user):
    tweets = (
        DBSession.query(Tweet)
        .filter_by(feed_user_id=user.id)
        .order_by(Tweet.posted_at.desc())
        .all()
    )
    return {
        'tweets': [tweet.to_dict() for tweet in tweets]
    }


@view_config(route_name='me', renderer='json')
def me_view(request):
    return {'me': get_logged_in_user(request).to_dict()}


@view_config(route_name='my_tweet_feed', renderer='json')
def my_tweet_feed_view(request):
    return get_tweet_feed_dict_for_user(get_logged_in_user(request))


@view_config(route_name='user_tweet_feed', renderer='json')
def user_tweet_feed_view(request):
    user_public_id = request.matchdict['user_public_id']
    user = DBSession.query(User).filter_by(public_id=user_public_id).one()
    return get_tweet_feed_dict_for_user(user)


@view_config(route_name='post_tweet', renderer='json')
def post_tweet_view(request):
    me = get_logged_in_user(request)
    tweet = Tweet.new_tweet(user=me, text=request.json_body['text'])
    DBSession.add(tweet)
    return {'tweet': tweet.to_dict()}
