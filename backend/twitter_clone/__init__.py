from pyramid.config import Configurator
from pyramid.request import (
    Response,
    Request
    )

from sqlalchemy import engine_from_config

from .models import DBSession, Base


def request_factory(env):
    request = Request(env)
    # TODO(cliff): Only do this for JSON api calls
    request.response = Response()
    request.response.headerlist = []
    request.response.headerlist.extend(
        (
            # TODO(cliff): Need to change before deploying to prod
            ('Access-Control-Allow-Origin', 'http://localhost:3000'),
            ('Content-Type', 'application/json'),
        )
    )
    return request


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.set_request_factory(request_factory)
    config.add_route('me', '/api/me')
    config.add_route('my_tweet_feed', '/api/me/tweet_feed')
    config.add_route('user_tweet_feed', '/api/user/{user_public_id}/tweet_feed')
    config.add_route('post_tweet', '/api/tweet', request_method='POST')
    config.scan()
    return config.make_wsgi_app()
