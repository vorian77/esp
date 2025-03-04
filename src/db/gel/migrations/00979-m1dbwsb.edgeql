CREATE MIGRATION m1dbwsbh3tbnn24fvfw2yyqyze3qq5ahbfgnw23xwjz7iypsiwlbyq
    ONTO m1kr3xaroxapv2ury4m557ig4hqzqts75ergeixgrljutqozutvdka
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      DROP PROPERTY functionParmKey;
  };
};
