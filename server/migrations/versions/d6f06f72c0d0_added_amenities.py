"""added amenities

Revision ID: d6f06f72c0d0
Revises: 4a63f365b3e0
Create Date: 2025-02-03 10:59:52.427175

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd6f06f72c0d0'
down_revision = '4a63f365b3e0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('amenities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rental_amenities',
    sa.Column('rental_id', sa.Integer(), nullable=False),
    sa.Column('amenity_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['amenity_id'], ['amenities.id'], name=op.f('fk_rental_amenities_amenity_id_amenities')),
    sa.ForeignKeyConstraint(['rental_id'], ['rentals.id'], name=op.f('fk_rental_amenities_rental_id_rentals')),
    sa.PrimaryKeyConstraint('rental_id', 'amenity_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('rental_amenities')
    op.drop_table('amenities')
    # ### end Alembic commands ###
