CREATE MIGRATION m1oeaxee7dzh7u72vpj4vmh7kbj7z5rbkdjifsaadwuwmvk6zuuzoa
    ONTO m1iswcnntdfzpincdcvqwoiawm5pmnzcf4vcttvmahnratn5ljov7q
{
          ALTER TYPE sys_rep::SysRepParm {
      CREATE LINK fieldEmbedListSelect: sys_core::SysDataObjFieldEmbedListSelect;
  };
  ALTER TYPE sys_rep::SysRepParm {
      DROP LINK fieldListItems;
  };
  ALTER TYPE sys_rep::SysRepParm {
      DROP PROPERTY fieldListItemsParmName;
  };
};
