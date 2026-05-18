"""add scheduler fields

Revision ID: 0f775f8f7b05
Revises: 500497ecb86b
Create Date: 2026-06-07 15:50:57.157199

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0f775f8f7b05'
down_revision: Union[str, Sequence[str], None] = '500497ecb86b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'pipelines',
        sa.Column('schedule_type', sa.String(), nullable=True)
    )

    op.add_column(
        'pipelines',
        sa.Column('is_active', sa.Boolean(), nullable=True)
    )


def downgrade() -> None:
    op.drop_column('pipelines', 'is_active')
    op.drop_column('pipelines', 'schedule_type')
