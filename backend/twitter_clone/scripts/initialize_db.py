import datetime
import os
import sys
import transaction

from sqlalchemy import engine_from_config

from pyramid.paster import (
    get_appsettings,
    setup_logging,
    )

from ..models import (
    DBSession,
    User,
    Tweet,
    Base,
    )


def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri>\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)


def main(argv=sys.argv):
    if len(argv) != 2:
        usage(argv)
    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    with transaction.manager:
        me_user = User(
            public_id=User.public_id_generator.next_public_id(),
            email="cliff@foobar.com",
            handle="cliffcrosland",
            name="Cliff Crosland",
            picture_url='https://pbs.twimg.com/profile_images/787739949793542144/0D4z_jYt_bigger.jpg',
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )
        foo_user = User(
            public_id=User.public_id_generator.next_public_id(),
            email="foo@bar.com",
            handle="foobar",
            name="Foo Bar",
            picture_url='https://pbs.twimg.com/profile_images/1545739358/3Mt2Nb7x_bigger',
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )
        max_roser_user = User(
            public_id=User.public_id_generator.next_public_id(),
            email="max@foo.com",
            handle="MaxCRoser",
            name="Max Roser",
            picture_url='https://pbs.twimg.com/profile_images/485754419271581696/UIyT6C0u_bigger.png',
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )

        DBSession.add(me_user)
        DBSession.add(foo_user)
        DBSession.add(max_roser_user)
        DBSession.flush()

        tweet1 = Tweet(
            public_id=Tweet.public_id_generator.next_public_id(),
            feed_user_id=me_user.id,
            author_user_id=foo_user.id,
            text="The rain in spain stays mainly in the plain",
            posted_at=datetime.datetime.now(),
            url='http://baz.com/foo/bar/baz/bash/baz',
            url_text='http://baz.com/foo/bar...',
            picture_url='https://pbs.twimg.com/media/DD0oefjVYAEvBVM.jpg',
        )
        tweet2 = Tweet(
            public_id=Tweet.public_id_generator.next_public_id(),
            feed_user_id=me_user.id,
            author_user_id=max_roser_user.id,
            text="Vaccination does work.",
            posted_at=datetime.datetime.now() - datetime.timedelta(hours=1),
            picture_url='https://pbs.twimg.com/media/DD0bmTCXoAAjzar.jpg',
        )

        DBSession.add(tweet1)
        DBSession.add(tweet2)
