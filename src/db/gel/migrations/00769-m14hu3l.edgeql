CREATE MIGRATION m14hu3l5j37itlgpwuj7ywrhbtiktiu57nyk5s7ak5z45owgnddpxa
    ONTO m1oeaxee7dzh7u72vpj4vmh7kbj7z5rbkdjifsaadwuwmvk6zuuzoa
{
          ALTER TYPE sys_rep::SysRepParm {
      CREATE LINK dataObjSelect: sys_core::SysDataObj;
  };
  ALTER TYPE sys_rep::SysRepParm {
      DROP LINK fieldEmbedListSelect;
  };
};
