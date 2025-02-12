"""Booking class in models.py

Revision ID: 08a25bf2e19f
Revises: 6c39004c1924
Create Date: 2025-01-31 11:26:22.517544

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '08a25bf2e19f'
down_revision = '6c39004c1924'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('rentals')
    op.drop_table('users')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('username', sa.VARCHAR(), nullable=False),
    sa.Column('_password_hash', sa.VARCHAR(), nullable=True),
    sa.Column('email', sa.VARCHAR(), nullable=True),
    sa.Column('first_name', sa.VARCHAR(), nullable=True),
    sa.Column('last_name', sa.VARCHAR(), nullable=True),
    sa.Column('profile_pic', sa.VARCHAR(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rentals',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=False),
    sa.Column('address', sa.VARCHAR(), nullable=True),
    sa.Column('city', sa.VARCHAR(), nullable=True),
    sa.Column('state', sa.VARCHAR(), nullable=True),
    sa.Column('daily_rate', sa.INTEGER(), nullable=True),
    sa.Column('description', sa.VARCHAR(), nullable=True),
    sa.Column('cover_pic', sa.VARCHAR(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
