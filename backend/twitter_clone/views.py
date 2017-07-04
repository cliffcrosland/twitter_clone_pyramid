from pyramid.view import view_config

from .models import (
    DBSession,
    Tweet,
    User,
    )


@view_config(route_name='home', renderer='templates/tweet_feed/index.jinja2')
def home_view(request):
    tweets = DBSession.query(Tweet).order_by(Tweet.posted_at).all()
    return {
        'me': {
            'picture_url': 'https://pbs.twimg.com/profile_images/787739949793542144/0D4z_jYt_normal.jpg',
        },
        'tweets_feed': [tweet.to_dict() for tweet in tweets]
    }

    """
    return {
        'tweets_feed': [
            {
                'user': {
                    'picture_url': 'https://pbs.twimg.com/profile_images/1545739358/3Mt2Nb7x_bigger',
                    'name': 'Mel Reams',
                    'handle': '@mel_reams',
                },
                'date': '3h',
                'text': "What's the big deal about years of experience in language?",
                'tweet_url': {
                    'url': 'http://www.google.com/',
                    'text': 'melreams.com/2017/07/whats-...',
                  },
                'picture_url': 'https://pbs.twimg.com/media/DD0oefjVYAEvBVM.jpg',
            }
        ]
    }
    """
