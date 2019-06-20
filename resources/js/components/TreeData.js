const data = {
  '/# frame': {
    path: '/# frame',
    type: 'folder',
    isRoot: true,
    children: ['/Btn/Grey/Icon', '/documents','/image'],
  },
  '/Btn/Grey/Icon': {
    path: '/Btn/Grey/Icon',
    type: 'folder',
    children: ['/readme.md'],
  },
  '/readme.md': {
    path: '/readme.md',
    type: 'file',
    content: 'Thanks for reading me.'
  },
  '/documents': {
    path: '/documents',
    type: 'file',
    content: 'Documents are here.'
  },
  '/image': {
    path: '/image',
    type: 'file',
    content: 'Image is here.'
  },
  '/group': {
    path: '/group',
    type: 'file',
    content: 'groups are here.'
  },
};

export default {
  getList() {
    return data;
  }
};
