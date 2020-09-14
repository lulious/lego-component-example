export default {
  componentId: '',
  componentType: '{{componentName}}',
  componentCategory: 'ALL',
  componentCategoryName: '默认类型',
  componentName: '',
  componentDesc: '',
  componentLabel: '',
  componentAuthorId: '',
  componentAuthorName: '',
  componentPreviewImage: 'component-preview-image.png',
  config: [
    {
      configKey: 'attr',
      configKeyLabel: '属性',
      fields: [
        {
          label: '两边留白',
          name: 'wingblank',
          type: 'Switch',
          required: false,
          regex: '',
          defaultValue: false,
          children: '',
        },
        {
          label: '底部留白',
          name: 'whitespace',
          type: 'Switch',
          required: false,
          regex: '',
          defaultValue: true,
          children: '',
        }
      ],
    },
  ],
};
