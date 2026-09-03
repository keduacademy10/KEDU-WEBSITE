/* =========================================
   KEDU SUPABASE CONNECTION
========================================= */


const KEDU_SUPABASE_URL =
    "https://bkbhfjqmlomjghxpgkxu.supabase.co";


const KEDU_SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_ZpK5437rrPmKU_18D21iDw_t-s_lZB2";


/* =========================================
   CREATE SUPABASE CLIENT
========================================= */


window.keduSupabase =
    window.supabase.createClient(
        KEDU_SUPABASE_URL,
        KEDU_SUPABASE_PUBLISHABLE_KEY
    );


/* =========================================
   CONNECTION READY
========================================= */


console.log(
    "KEDU Supabase Connected"
);