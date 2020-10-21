#!/bin/bash
message=$1
declare -a names=("Melanie Bochero" "Catalina Largo")
declare -a emails=("melanieuwu28@gmail.com" "katalinalargo24@gmail.com")
selected=$((0 + RANDOM % 2))
name=${names[$selected]}
email=${emails[$selected]}
echo "Running git commit command with the user ${name} ${email} and message: $message"
git commit --author="$name <$email>" -m "$message"

