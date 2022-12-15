#!/bin/bash

set -o pipefail

REPO="tensorchord/envd"
VERSION=$1
DOWNLOAD_NAME=$(mktemp -u --suffix .envd)

get_github_latest_release() {
    curl -sSf "https://api.github.com/repos/$1/releases/latest" | # Get latest release from GitHub api
    grep '"tag_name":' |                                          # Get tag line
    sed -E 's/.*"v?([^"]+)".*/\1/'                                # Pluck JSON value
}

log_success() {
    echo -e "\033[32m$1\033[0m"
}

log_info() {
    echo -e "\033[36m$1\033[0m"
}

log_fatal() {
    echo -e "\033[31m$1\033[0m" >&2
    rm -f $DOWNLOAD_NAME
    exit 1
}

if [ -z "$VERSION" ]; then
    VERSION=$(get_github_latest_release $REPO)
fi

PLATFORM=$(uname)
ARCH=$(uname -p)
FILE_URL="https://github.com/${REPO}/releases/download/v${VERSION}/envd_${VERSION}_${PLATFORM}_${ARCH}"
TARGET_FILE="/usr/local/bin/envd"

log_info "Downloading envd ${VERSION} for ${PLATFORM} ${ARCH}..."
curl -fL -o $DOWNLOAD_NAME $FILE_URL || log_fatal "Failed to download envd ${VERSION} for ${PLATFORM} ${ARCH}: no matching binary is found."

if [ ! -w $(dirname $TARGET_FILE) ]; then
    log_fatal "Failed to install envd ${VERSION}: no write access to $(dirname $TARGET_FILE). Use 'sudo' if necessary."
fi
log_info "Installing envd ${VERSION} as ${TARGET_FILE}..."
mv $DOWNLOAD_NAME $TARGET_FILE || log_fatal "Failed to install envd!"
chmod +x $TARGET_FILE || log_fatal "Failed to install envd!"
log_success "Successfully installed envd ${VERSION}! for ${PLATFORM} ${ARCH}.\nPlease run 'envd bootstrap' to get started and 'envd --help' for available commands."
