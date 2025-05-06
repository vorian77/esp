CREATE MIGRATION m1oexpbuvc42nlbzkexx2tyt5yb66nki42ggxm6ifhkf7unuiqv4la
    ONTO m1ese32fdbpw7hs5hlnpius3aiibqyzpz4jozf7pfpi3tdn7tk2zpq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY exprFilter {
          RENAME TO exprFilterOld;
      };
  };
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY exprSort {
          RENAME TO exprSortOld;
      };
  };
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY exprWith {
          RENAME TO exprWithOld;
      };
  };
};
