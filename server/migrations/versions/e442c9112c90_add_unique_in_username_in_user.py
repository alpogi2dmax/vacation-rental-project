"""add unique in username in user

Revision ID: e442c9112c90
Revises: 48513df97df2
Create Date: 2025-02-05 16:09:40.737458

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e442c9112c90'
down_revision = '48513df97df2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rentals', schema=None) as batch_op:
        batch_op.drop_constraint('uq_rentals_name', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rentals', schema=None) as batch_op:
        batch_op.create_unique_constraint('uq_rentals_name', ['name'])

    # ### end Alembic commands ###
