"""empty message

Revision ID: 5b515dd63db3
Revises: c1afe816004b
Create Date: 2024-06-09 17:15:31.811571

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5b515dd63db3'
down_revision = 'c1afe816004b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('species',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('classification', sa.String(), nullable=False),
    sa.Column('designation', sa.String(), nullable=False),
    sa.Column('average_height', sa.Integer(), nullable=False),
    sa.Column('average_lifespan', sa.Integer(), nullable=False),
    sa.Column('language', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('character_favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('character_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['character_id'], ['characters.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('characters', schema=None) as batch_op:
        batch_op.add_column(sa.Column('specie_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'species', ['specie_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('characters', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('specie_id')

    op.drop_table('character_favorites')
    op.drop_table('species')
    # ### end Alembic commands ###
