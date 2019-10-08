_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/"
_NODE_DIR="${_DIR}website/line-drive-betting/"
cd ${_NODE_DIR}
if [ ! -d "${_NODE_DIR}/node_modules" ]; then
  npm install
fi
npm start
