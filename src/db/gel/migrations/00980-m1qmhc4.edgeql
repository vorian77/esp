CREATE MIGRATION m1qmhc4xf6obndzuxgbnrptmvb6kp2qtieugk5ezlb7ehjqt2f7plq
    ONTO m1dbwsbh3tbnn24fvfw2yyqyze3qq5ahbfgnw23xwjz7iypsiwlbyq
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      CREATE LINK codeType: sys_core::SysCode;
      CREATE PROPERTY expr: std::str;
  };
};
