import isPlainObject from 'lodash/isPlainObject';

export const getDefaultValue = (data) => {
  if (!data) {
    return {};
  }

  const defaultVal = {};

  data.config.forEach((i) => {
    defaultVal[i.configKey] = defaultVal[i.configKey] || {};
    const sub = defaultVal[i.configKey];
    i.fields.forEach((j) => {
      sub[j.name] = j.defaultValue;

      if (j.type === 'Array') {
        sub[j.name] = [];
        if (Array.isArray(j.children)) {
          j.children.forEach((k) => {
            if (!sub[j.name][0]) {
              sub[j.name].push({});
            }
            sub[j.name][0][k.name] = k.defaultValue;
          });
        } else if (isPlainObject(j.children)) {
          sub[j.name].push(j.children.defaultValue);
        }
      }
    });
  });

  return defaultVal;
};
