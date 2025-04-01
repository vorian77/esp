CREATE MIGRATION m14ez3v6snzei2lrpfkp5rzfqak23uno5au6v2luv7s7muv27is3qq
    ONTO m1yxcungr3xfjz2zlifgn7pqhhhqsojjibxbrawtaicoz6risveu7a
{
  ALTER TYPE sys_core::SysMsg {
      CREATE LINK thread := (.responses);
  };
};
