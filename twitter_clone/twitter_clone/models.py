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


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    public_id = Column(Text, unique=True)
    email = Column(Text, unique=True)
    handle = Column(Text, unique=True)
    name = Column(Text)
    picture_url = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)


class Tweet(Base):
    __tablename__ = 'tweets'
    id = Column(Integer, primary_key=True)
    public_id = Column(Text, unique=True)
    user_id = Column(Integer)
    text = Column(Text)
    posted_at = Column(DateTime)
    url = Column(Text)
    url_text = Column(Text)
    picture_url = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def to_dict(self):
        return {
            'user': self.user_dict(),
            'date': self.date_string(),
            'text': self.text,
            'url': self.url,
            'url_text': self.url_text,
            'picture_url': self.picture_url,
        }

    def user_dict(self):
        user = DBSession.query(User).filter_by(id=self.user_id).one()
        if user == None:
            return None
        else:
            return {
                'picture_url': user.picture_url,
                'name': user.name,
                'handle': "@{}".format(user.handle),
            }

    def date_string(self):
        return '3h'

