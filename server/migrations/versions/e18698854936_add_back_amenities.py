"""add back amenities

Revision ID: e18698854936
Revises: 0376b6635fe7
Create Date: 2025-02-03 12:30:05.691872

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e18698854936'
down_revision = '0376b6635fe7'
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
