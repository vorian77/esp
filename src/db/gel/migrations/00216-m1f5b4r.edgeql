CREATE MIGRATION m1f5b4ryjc66obbmqo4uv5vkfc2ah7oa4kghczldfhfnif6g3zptka
    ONTO m1kl7bjc4bzy3eytcy6rsmvktixczvpybd2a2wmtrngma22zsyojra
{
                              ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI LINK linkColumnsDisplay: sys_db::SysColumn;
  };
};
