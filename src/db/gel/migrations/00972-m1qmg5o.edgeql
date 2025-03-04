CREATE MIGRATION m1qmg5or356z4rpk7couodgrcyxacmdjso43x75fh7usvosg3vbiqq
    ONTO m15etax34ihedw3ysopfuvbcmn3rluoogicrwllntnfitxxyqu3hha
{
  ALTER TYPE app_cm::CmGroup {
      ALTER LINK userMgr {
          RENAME TO userGroupMgr;
      };
  };
};
