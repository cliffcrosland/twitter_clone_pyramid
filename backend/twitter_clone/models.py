import datetime
import uuid

from pyramid.security import Allow, Everyone

from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    Text,
    )

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    )

from zope.sqlalchemy import ZopeTransactionExtension


DBSession = scoped_session(
    sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()


class PublicIdGenerator(object):
    def __init__(self, prefix):
        self.prefix = prefix

    def next_public_id(self):
        return '{}:{}'.format(self.prefix, str(uuid.uuid4()))


class User(Base):
    __tablename__ = 'users'
    public_id_generator = PublicIdGenerator('u')

    # columns
    id = Column(Integer, primary_key=True)
    public_id = Column(Text, unique=True)
    email = Column(Text, unique=True)
    handle = Column(Text, unique=True)
    name = Column(Text)
    picture_url = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    @staticmethod
    def public_id_prefix():
        return 'u'

    def to_dict(self):
        return {
            'id': self.public_id,
            'handle': self.handle,
            'name': self.name,
            'picture_url': self.picture_url,
        }


class Tweet(Base):
    __tablename__ = 'tweets'
    public_id_generator = PublicIdGenerator('t')

    # columns
    id = Column(Integer, primary_key=True)
    public_id = Column(Text, unique=True)
    author_user_id = Column(Integer)
    feed_user_id = Column(Integer)
    text = Column(Text)
    posted_at = Column(DateTime)
    url = Column(Text)
    url_text = Column(Text)
    picture_url = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    @staticmethod
    def new_tweet(user=None, text=None):
        return Tweet(
            public_id=Tweet.public_id_generator.next_public_id(),
            author_user_id=user.id,
            feed_user_id=user.id,
            text=text,
            posted_at=datetime.datetime.now(),
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )

    def to_dict(self):
        return {
            'id': self.public_id,
            'author': self.author_dict(),
            'date_time': self.posted_at.isoformat(),
            'text': self.text,
            'url': self.url,
            'url_text': self.url_text,
            'picture_url': self.picture_url,
        }

    def author_dict(self):
        author = DBSession.query(User).filter_by(id=self.author_user_id).one()
        if author == None:
            return None
        else:
            return {
                'picture_url': author.picture_url,
                'name': author.name,
                'handle': "@{}".format(author.handle),
            }
