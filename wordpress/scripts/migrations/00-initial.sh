#!/usr/bin/env bash

# Use migrations scripts if some functionality changed
# and you need to adjust old data to the new functionality.

# For example if you remove a field in some custom post type,
# you should remove that field from post types
# that were created before that change.

# This can be tricky in some situations,
# but if it can be done it's good to have this migration logic versioned.

# Migrations should be applied in order,
# because changes happen one after another.
# You can put separate migrations in separate files.
# Just prepend the filename with a number higher then the previous one.

# For example migrations scripts could be named like:
# - 01-remove-image-from-member.sh
# - 02-add-description-to-event.sh

# This migration script is empty, but you can keep it in source control.
# This way we are sure that the directory with migrations exists.
