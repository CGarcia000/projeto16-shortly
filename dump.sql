--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    id_user integer NOT NULL,
    token character varying(150) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: url_shorten; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.url_shorten (
    id integer NOT NULL,
    url text NOT NULL,
    identifier character varying(100) NOT NULL,
    id_user integer NOT NULL,
    visits integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.url_shorten OWNER TO postgres;

--
-- Name: url_shorten_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.url_shorten_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.url_shorten_id_seq OWNER TO postgres;

--
-- Name: url_shorten_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.url_shorten_id_seq OWNED BY public.url_shorten.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(150) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: url_shorten id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url_shorten ALTER COLUMN id SET DEFAULT nextval('public.url_shorten_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, id_user, token, "createdAt") FROM stdin;
1	1	1802b0ad-cda3-42de-9657-cc52490172a2	2022-10-16 18:23:40.903804
2	2	6cb11630-ffa9-40c5-99a5-ef95320e4a87	2022-10-16 18:23:40.903804
3	3	c0694498-d0e6-4398-a590-9a54deff362c	2022-10-16 18:25:31.829653
4	4	b3d7e4c9-0a6e-4201-9f61-08ab0f590905	2022-10-16 19:51:42.184735
\.


--
-- Data for Name: url_shorten; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.url_shorten (id, url, identifier, id_user, visits, "createdAt") FROM stdin;
6	https://www.w3schools.com/sql/sql_create_tabl.asp	bdYRy46UQW_6	1	0	2022-10-16 18:25:41.393258
5	https://www.w3schools.com/sql/sql_create_table.asp	Eoj9HsXYiQCy	1	4	2022-10-16 18:23:34.146955
7	https://www.w3schools.com/sql/sql_create_tabl.asp	_dZyigWZXL7x	3	1	2022-10-16 19:28:19.201738
8	https://www.w3schools.com/sql/sql_reate_tabl.asp	Skm3cZJhWWne	3	1	2022-10-16 19:30:35.765641
9	https://www.w3schools.com/sql/sql_reate_tabl.asp	9NxtAPV3WSyJ	2	0	2022-10-16 19:32:37.676643
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, "createdAt") FROM stdin;
1	teste	teste@teste.com	$2b$10$GWkTA1v4A7G8esSnxHaDCuflqAyhZnB.kau5.N1LGOe6KLqI4kzeK	2022-10-16 18:22:05.607627
2	teste2	teste2@teste.com	$2b$10$/FHMFuppuY0p5RxvKUz.Mum1.ISNykRFRJUaTxRlmWF9OEEssFWwS	2022-10-16 18:22:05.607627
3	teste3	teste3@teste.com	$2b$10$ZS9w8EdFk.lIv.d0r1yEbuxPYS0sCi5ZpFkeCwf9NFMAqgOg2EtQy	2022-10-16 18:23:07.086983
4	testeFinal	testeFinal@teste.com	$2b$10$lZBCzxS.CSH.flakQ7R/AOPHApOoRR01NaDoSNy0ZtXaHTpHsPeJ6	2022-10-16 19:51:32.501696
\.


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 4, true);


--
-- Name: url_shorten_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.url_shorten_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: sessions sessions_id_user_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_id_user_key UNIQUE (id_user);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: url_shorten url_shorten_identifier_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url_shorten
    ADD CONSTRAINT url_shorten_identifier_key UNIQUE (identifier);


--
-- Name: url_shorten url_shorten_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url_shorten
    ADD CONSTRAINT url_shorten_pk PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk_user FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- Name: url_shorten url_shorten_fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url_shorten
    ADD CONSTRAINT url_shorten_fk_user FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

