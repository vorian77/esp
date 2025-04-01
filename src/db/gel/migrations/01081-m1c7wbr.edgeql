CREATE MIGRATION m1c7wbrnqcbprno5y6fcywskx6f73ubgqqmgi4jllegf3gdq5jqyga
    ONTO m14ez3v6snzei2lrpfkp5rzfqak23uno5au6v2luv7s7muv27is3qq
{
  ALTER TYPE sys_core::SysMsg {
      ALTER LINK thread {
          USING (DISTINCT ((.responses UNION sys_core::SysMsg)));
      };
  };
};
