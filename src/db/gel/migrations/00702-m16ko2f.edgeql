CREATE MIGRATION m16ko2fwbdqrfzaoii6smixbgjrkn7fojxy23ufqwi5ggbtz3naodq
    ONTO m1wl2eevtnyuawacvjof55ixdjrtjbsuzlhunh4odu3rrwajrhjboa
{
              ALTER TYPE app_cm::CmClientServiceFlow {
      CREATE LINK codeStatus: sys_core::SysCode;
  };
};
