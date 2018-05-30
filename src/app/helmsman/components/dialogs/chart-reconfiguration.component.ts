import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgSwitch, NgSwitchDefault } from '@angular/common';


@Component({
    selector: 'app-chart-reconfiguration-dialog',
    templateUrl: './chart-reconfiguration.component.html',
    styleUrls: ['./chart-reconfiguration.component.css']
})
export class ChartReconfigurationDlgComponent {

    jsonFormOptions: any = {
            addSubmit: false, // Add a submit button if layout does not have one
            debug: false, // Don't show inline debugging information
            loadExternalAssets: false, // Load external css and JavaScript for frameworks
            returnEmptyFields: false, // Don't return values for empty input fields
            setSchemaDefaults: true, // Always use schema defaults for empty fields
            defautWidgetOptions: { feedback: true }, // Show inline feedback icons
          };

    jsonSchemaJson: any = {
            "schema":
            {
                "type": "object",
                "properties": {
                    "filter-with": {
                        "type": "string",
                        "default": "proxy-prefix",
                        "description": "If running behind a proxy server and Galaxy is served from a subdirectory,\nenable the proxy-prefix filter and set the prefix in the\n[filter:proxy-pref..."
                    },
                    "cookie_path": {
                        "type": "string",
                        "default": "",
                        "description": "If proxy-prefix is enabled and you're running more than one Galaxy instance\nbehind one hostname, you will want to set this to the same path as the pre..."
                    },
                    "database_connection": {
                        "type": "string",
                        "default": "sqlite:///./database/universe.sqlite?isolation_level=IMMEDIATE",
                        "description": "By default, Galaxy uses a SQLite database at 'database/universe.sqlite'.  You\nmay use a SQLAlchemy connection string to specify an external database\ni..."
                    },
                    "database_engine_option_pool_size": {
                        "type": "number",
                        "default": 5,
                        "description": "If the server logs errors about not having enough database pool connections,\nyou will want to increase these values, or consider running more Galaxy\np..."
                    },
                    "database_engine_option_max_overflow": {
                        "type": "number",
                        "default": 10,
                        "description": "If the server logs errors about not having enough database pool connections,\nyou will want to increase these values, or consider running more Galaxy\np..."
                    },
                    "database_engine_option_pool_recycle": {
                        "type": "number",
                        "default": -1,
                        "description": "If using MySQL and the server logs the error \"MySQL server has gone away\",\nyou will want to set this to some positive value (7200 should work).\n"
                    },
                    "database_engine_option_server_side_cursors": {
                        "type": "boolean",
                        "default": "",
                        "description": "If large database query results are causing memory or response time issues in\nthe Galaxy process, leave the result on the server instead.  This option..."
                    },
                    "database_query_profiling_proxy": {
                        "type": "boolean",
                        "default": "",
                        "description": "Log all database transactions, can be useful for debugging and performance\nprofiling.  Logging is done via Python's 'logging' module under the qualnam..."
                    },
                    "database_template": {
                        "type": "string",
                        "default": "",
                        "description": "If auto-creating a postgres database on startup - it can be based on an existing\ntemplate database. This will set that. This is probably only useful f..."
                    },
                    "slow_query_log_threshold": {
                        "type": "number",
                        "default": "",
                        "description": "Slow query logging.  Queries slower than the threshold indicated below will\nbe logged to debug.  A value of '0' is disabled.  For example, you would s..."
                    },
                    "enable_per_request_sql_debugging": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable's a per request sql debugging option. If this is set to true, append\n?sql_debug=1 to web request URLs to enable detailed logging on the backend..."
                    },
                    "install_database_connection": {
                        "type": "string",
                        "default": "sqlite:///./database/universe.sqlite?isolation_level=IMMEDIATE",
                        "description": "By default, Galaxy will use the same database to track user data and\ntool shed install data.  There are many situations in which it is\nvaluable to sep..."
                    },
                    "database_auto_migrate": {
                        "type": "boolean",
                        "default": "",
                        "description": "Setting the following option to true will cause Galaxy to automatically\nmigrate the database forward after updates. This is not recommended for produc..."
                    },
                    "file_path": {
                        "type": "string",
                        "default": "database/files",
                        "description": "Dataset files are stored in this directory.\n"
                    },
                    "new_file_path": {
                        "type": "string",
                        "default": "database/tmp",
                        "description": "Temporary files are stored in this directory.\n"
                    },
                    "tool_config_file": {
                        "type": "string",
                        "default": "config/tool_conf.xml,config/shed_tool_conf.xml",
                        "description": "Tool config files, defines what tools are available in Galaxy.\nTools can be locally developed or installed from Galaxy tool sheds.\n(config/tool_conf.x..."
                    },
                    "check_migrate_tools": {
                        "type": "boolean",
                        "default": true,
                        "description": "Enable / disable checking if any tools defined in the above non-shed\ntool_config_files (i.e., tool_conf.xml) have been migrated from the Galaxy\ncode d..."
                    },
                    "migrated_tools_config": {
                        "type": "string",
                        "default": "config/migrated_tools_conf.xml",
                        "description": "Tool config maintained by tool migration scripts.  If you use the migration\nscripts to install tools that have been migrated to the tool shed upon a n..."
                    },
                    "integrated_tool_panel_config": {
                        "type": "string",
                        "default": "integrated_tool_panel.xml",
                        "description": "File that contains the XML section and tool tags from all tool panel config\nfiles integrated into a single file that defines the tool panel layout.  T..."
                    },
                    "tool_path": {
                        "type": "string",
                        "default": "tools",
                        "description": "Default path to the directory containing the tools defined in tool_conf.xml.\nOther tool config files must include the tool_path as an attribute in the..."
                    },
                    "tool_dependency_dir": {
                        "type": "string",
                        "default": "database/dependencies",
                        "description": "Path to the directory in which tool dependencies are placed.  This is used by\nthe Tool Shed to install dependencies and can also be used by administra..."
                    },
                    "dependency_resolvers_config_file": {
                        "type": "string",
                        "default": "config/dependency_resolvers_conf.xml",
                        "description": "The dependency resolvers config file specifies an ordering and options for how\nGalaxy resolves tool dependencies (requirement tags in Tool XML). The d..."
                    },
                    "conda_prefix": {
                        "type": "string",
                        "default": "<tool_dependency_dir>/_conda",
                        "description": "conda_prefix is the location on the filesystem where Conda packages and environments are installed\nIMPORTANT: Due to a current limitation in conda, th..."
                    },
                    "conda_exec": {
                        "type": "string",
                        "description": "Override the Conda executable to use, it will default to the one on the\nPATH (if available) and then to <conda_prefix>/bin/conda\n"
                    },
                    "conda_debug": {
                        "type": "boolean",
                        "default": "",
                        "description": "Pass debug flag to conda commands.\n"
                    },
                    "conda_ensure_channels": {
                        "type": "string",
                        "default": "iuc,bioconda,conda-forge,defaults",
                        "description": "conda channels to enable by default (http://conda.pydata.org/docs/custom-channels.html)\n"
                    },
                    "conda_auto_install": {
                        "type": "boolean",
                        "default": "",
                        "description": "Set to True to instruct Galaxy to look for and install missing tool\ndependencies before each job runs.\n"
                    },
                    "conda_auto_init": {
                        "type": "boolean",
                        "default": true,
                        "description": "Set to True to instruct Galaxy to install Conda from the web automatically\nif it cannot find a local copy and conda_exec is not configured.\n"
                    },
                    "conda_copy_dependencies": {
                        "type": "boolean",
                        "default": "",
                        "description": "You must set this to True if conda_prefix and job_working_directory are not on the same\nvolume, or some conda dependencies will fail to execute at job..."
                    },
                    "use_cached_dependency_manager": {
                        "type": "boolean",
                        "default": "",
                        "description": "Certain dependency resolvers (namely Conda) take a considerable amount of\ntime to build an isolated job environment in the job_working_directory if th..."
                    },
                    "tool_dependency_cache_dir": {
                        "type": "string",
                        "default": "<tool_dependency_dir>/_cache",
                        "description": "By default the tool_dependency_cache_dir is the _cache directory\nof the tool dependency directory\n"
                    },
                    "precache_dependencies": {
                        "type": "boolean",
                        "default": true,
                        "description": "By default, when using a cached dependency manager, the dependencies are cached\nwhen installing new tools and when using tools for the first time.\nSet..."
                    },
                    "tool_sheds_config_file": {
                        "type": "string",
                        "default": "config/tool_sheds_conf.xml",
                        "description": "File containing the Galaxy Tool Sheds that should be made available to\ninstall from in the admin interface (.sample used if default does not exist).\n"
                    },
                    "watch_tools": {
                        "type": "string",
                        "default": "",
                        "description": "Set to True to enable monitoring of tools and tool directories\nlisted in any tool config file specified in tool_config_file option.\nIf changes are fou..."
                    },
                    "enable_beta_mulled_containers": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable Galaxy to fetch Docker containers registered with quay.io generated\nfrom tool requirements resolved through conda. These containers (when\navail..."
                    },
                    "containers_resolvers_config_file": {
                        "type": "string",
                        "default": "",
                        "description": "Container resolvers configuration (beta). Setup a file describing container\nresolvers to use when discovering containers for Galaxy. If this is set to..."
                    },
                    "involucro_path": {
                        "type": "string",
                        "default": "database/dependencies/involucro",
                        "description": "involucro is a tool used to build Docker containers for tools from Conda\ndependencies referenced in tools as `requirement`s. The following path is\nthe..."
                    },
                    "involucro_auto_init": {
                        "type": "boolean",
                        "default": true,
                        "description": "Install involucro as needed to build Docker containers for tools. Ignored if\nrelevant container resolver is not used.\n"
                    },
                    "enable_tool_shed_check": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable automatic polling of relative tool sheds to see if any updates\nare available for installed repositories.  Ideally only one Galaxy\nserver proces..."
                    },
                    "hours_between_check": {
                        "type": "number",
                        "default": 12,
                        "description": "Enable automatic polling of relative tool sheds to see if any updates\nare available for installed repositories.  Ideally only one Galaxy\nserver proces..."
                    },
                    "manage_dependency_relationships": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable use of an in-memory registry with bi-directional relationships between\nrepositories (i.e., in addition to lists of dependencies for a repositor..."
                    },
                    "tool_data_table_config_path": {
                        "type": "string",
                        "default": "config/tool_data_table_conf.xml",
                        "description": "XML config file that contains data table entries for the\nToolDataTableManager.  This file is manually # maintained by the Galaxy\nadministrator (.sampl..."
                    },
                    "shed_tool_data_table_config": {
                        "type": "string",
                        "default": "config/shed_tool_data_table_conf.xml",
                        "description": "XML config file that contains additional data table entries for the\nToolDataTableManager.  This file is automatically generated based on the\ncurrent i..."
                    },
                    "tool_data_path": {
                        "type": "string",
                        "default": "tool-data",
                        "description": "Directory where data used by tools is located.  See the samples in that\ndirectory and the Galaxy Community Hub for help:\nhttps://galaxyproject.org/adm..."
                    },
                    "shed_tool_data_path": {
                        "type": "string",
                        "default": "tool-data",
                        "description": "Directory where Tool Data Table related files will be placed\nwhen installed from a ToolShed. Defaults to tool_data_path.\n"
                    },
                    "watch_tool_data_dir": {
                        "type": "string",
                        "default": "",
                        "description": "Set to True to enable monitoring of the tool_data and shed_tool_data_path\ndirectories. If changes in tool data table files are found, the tool data\nta..."
                    },
                    "builds_file_path": {
                        "type": "string",
                        "default": "tool-data/shared/ucsc/builds.txt",
                        "description": "File containing old-style genome builds\n"
                    },
                    "len_file_path": {
                        "type": "string",
                        "default": "tool-data/shared/ucsc/chrom",
                        "description": "Directory where chrom len files are kept, currently mainly used by trackster\n"
                    },
                    "datatypes_config_file": {
                        "type": "string",
                        "default": "config/datatypes_conf.xml",
                        "description": "Datatypes config file(s), defines what data (file) types are available in\nGalaxy (.sample is used if default does not exist).  If a datatype appears i..."
                    },
                    "datatypes_disable_auto": {
                        "type": "boolean",
                        "default": "",
                        "description": "Disable the 'Auto-detect' option for file uploads\n"
                    },
                    "visualization_plugins_directory": {
                        "type": "string",
                        "default": "config/plugins/visualizations",
                        "description": "Visualizations config directory: where to look for individual visualization\nplugins.  The path is relative to the Galaxy root dir.  To use an absolute..."
                    },
                    "interactive_environment_plugins_directory": {
                        "type": "string",
                        "description": "Interactive environment plugins root directory: where to look for interactive\nenvironment plugins.  By default none will be loaded.  Set to\nconfig/plu..."
                    },
                    "interactive_environment_swarm_mode": {
                        "type": "boolean",
                        "default": "",
                        "description": "To run interactive environment containers in Docker Swarm mode (on an\nexisting swarm), set this option to True and set `docker_connect_port` in the\nIE..."
                    },
                    "swarm_manager_config_file": {
                        "type": "string",
                        "default": "config/swarm_manager_conf.yml",
                        "description": "Galaxy can run a \"swarm manager\" service that will monitor utilization of the\nswarm and provision/deprovision worker nodes as necessary. The service h..."
                    },
                    "tour_config_dir": {
                        "type": "string",
                        "default": "config/plugins/tours",
                        "description": "Interactive tour directory: where to store interactive tour definition files.\nGalaxy ships with several basic interface tours enabled, though a differ..."
                    },
                    "webhooks_dir": {
                        "type": "string",
                        "default": "config/plugins/webhooks",
                        "description": "Webhooks directory: where to store webhooks - plugins to extend the Galaxy UI.\nBy default none will be loaded.  Set to config/plugins/webhooks/demo to..."
                    },
                    "job_working_directory": {
                        "type": "string",
                        "default": "database/jobs_directory",
                        "description": "Each job is given a unique empty directory as its current working directory.\nThis option defines in what parent directory those directories will be\ncr..."
                    },
                    "cluster_files_directory": {
                        "type": "string",
                        "default": "database/pbs",
                        "description": "If using a cluster, Galaxy will write job scripts and stdout/stderr to this\ndirectory.\n"
                    },
                    "template_cache_path": {
                        "type": "string",
                        "default": "database/compiled_templates",
                        "description": "Mako templates are compiled as needed and cached for reuse, this directory is\nused for the cache\n"
                    },
                    "check_job_script_integrity": {
                        "type": "boolean",
                        "default": true,
                        "description": "Set to false to disable various checks Galaxy will do to ensure it\ncan run job scripts before attempting to execute or submit them.\n"
                    },
                    "check_job_script_integrity_count": {
                        "type": "number",
                        "default": 35,
                        "description": "Number of checks to execute if check_job_script_integrity is enabled.\n"
                    },
                    "check_job_script_integrity_sleep": {
                        "type": "string",
                        "default": 0.25,
                        "description": "Time to sleep between checks if check_job_script_integrity is enabled (in seconds).\n"
                    },
                    "default_job_shell": {
                        "type": "string",
                        "default": "/bin/bash",
                        "description": "Set the default shell used by non-containerized jobs Galaxy-wide. This\ndefaults to bash for all jobs and can be overridden at the destination\nlevel fo..."
                    },
                    "citation_cache_type": {
                        "type": "string",
                        "default": "file",
                        "description": "Citation related caching.  Tool citations information maybe fetched from\nexternal sources such as http://dx.doi.org/ by Galaxy - the following\nparamet..."
                    },
                    "citation_cache_data_dir": {
                        "type": "string",
                        "default": "database/citations/data",
                        "description": "Citation related caching.  Tool citations information maybe fetched from\nexternal sources such as http://dx.doi.org/ by Galaxy - the following\nparamet..."
                    },
                    "citation_cache_lock_dir": {
                        "type": "string",
                        "default": "database/citations/lock",
                        "description": "Citation related caching.  Tool citations information maybe fetched from\nexternal sources such as http://dx.doi.org/ by Galaxy - the following\nparamet..."
                    },
                    "collect_outputs_from": {
                        "type": "string",
                        "default": "new_file_path,job_working_directory",
                        "description": "Tools with a number of outputs not known until runtime can write these\noutputs to a directory for collection by Galaxy when the job is done.\nPreviousl..."
                    },
                    "object_store_config_file": {
                        "type": "string",
                        "default": "config/object_store_conf.xml",
                        "description": "Configuration file for the object store\nIf this is set and exists, it overrides any other objectstore settings.\n"
                    },
                    "smtp_server": {
                        "type": "string",
                        "default": "",
                        "description": "Galaxy sends mail for various things: subscribing users to the mailing list\nif they request it, password resets, reporting dataset errors, and sending..."
                    },
                    "smtp_username": {
                        "type": "string",
                        "default": "",
                        "description": "If your SMTP server requires a username and password, you can provide them\nhere (password in cleartext here, but if your server supports STARTTLS it\nw..."
                    },
                    "smtp_password": {
                        "type": "string",
                        "default": "",
                        "description": "If your SMTP server requires a username and password, you can provide them\nhere (password in cleartext here, but if your server supports STARTTLS it\nw..."
                    },
                    "smtp_ssl": {
                        "type": "boolean",
                        "default": "",
                        "description": "If your SMTP server requires SSL from the beginning of the connection\n"
                    },
                    "mailing_join_addr": {
                        "type": "string",
                        "default": "galaxy-announce-join@bx.psu.edu",
                        "description": "On the user registration form, users may choose to join a mailing list. This\nis the address used to subscribe to the list. Uncomment and leave empty i..."
                    },
                    "error_email_to": {
                        "type": "string",
                        "default": "",
                        "description": "Datasets in an error state include a link to report the error.  Those reports\nwill be sent to this address.  Error reports are disabled if no address ..."
                    },
                    "email_from": {
                        "type": "string",
                        "default": "",
                        "description": "Email address to use in the 'From' field when sending emails for\naccount activations, workflow step notifications and password resets.\nWe recommend us..."
                    },
                    "instance_resource_url": {
                        "type": "string",
                        "default": "https://galaxyproject.org/",
                        "description": "URL of the support resource for the galaxy instance.  Used in activation\nemails.\n"
                    },
                    "blacklist_file": {
                        "type": "string",
                        "default": "config/disposable_email_blacklist.conf",
                        "description": "E-mail domains blacklist is used for filtering out users that are using\ndisposable email address during the registration.  If their address domain\nmat..."
                    },
                    "registration_warning_message": {
                        "type": "string",
                        "default": "Please register only one account - we provide this service free of charge and have limited computational resources. Multi-accounts are tracked and will be subjected to account termination and data deletion.",
                        "description": "Registration warning message is used to discourage people from registering\nmultiple accounts.  Applies mostly for the main Galaxy instance.\nIf no mess..."
                    },
                    "user_activation_on": {
                        "type": "boolean",
                        "default": "",
                        "description": "User account activation feature global flag.  If set to \"False\", the rest of\nthe Account activation configuration is ignored and user activation is\ndi..."
                    },
                    "activation_grace_period": {
                        "type": "number",
                        "default": 3,
                        "description": "Activation grace period (in hours).  Activation is not forced (login is not\ndisabled) until grace period has passed.  Users under grace period can't r..."
                    },
                    "inactivity_box_content": {
                        "type": "string",
                        "default": "Your account has not been activated yet.  Feel free to browse around and see what's available, but you won't be able to upload data or run jobs until you have verified your email address.",
                        "description": "Shown in warning box to users that were not activated yet.\nIn use only if activation_grace_period is set.\n"
                    },
                    "password_expiration_period": {
                        "type": "number",
                        "default": "",
                        "description": "Password expiration period (in days). Users are required to change their\npassword every x days. Users will be redirected to the change password\nscreen..."
                    },
                    "session_duration": {
                        "type": "number",
                        "default": "",
                        "description": "Galaxy Session Timeout\nThis provides a timeout (in minutes) after which a user will have to log back in.\nA duration of 0 disables this feature.\n"
                    },
                    "ga_code": {
                        "type": "string",
                        "default": "",
                        "description": "You can enter tracking code here to track visitor's behavior\nthrough your Google Analytics account.  Example: UA-XXXXXXXX-Y\n"
                    },
                    "display_servers": {
                        "type": "string",
                        "default": "hgw1.cse.ucsc.edu,hgw2.cse.ucsc.edu,hgw3.cse.ucsc.edu,hgw4.cse.ucsc.edu,hgw5.cse.ucsc.edu,hgw6.cse.ucsc.edu,hgw7.cse.ucsc.edu,hgw8.cse.ucsc.edu,lowepub.cse.ucsc.edu",
                        "description": "Galaxy can display data at various external browsers.  These options specify\nwhich browsers should be available.  URLs and builds available at these\nb..."
                    },
                    "enable_old_display_applications": {
                        "type": "boolean",
                        "default": true,
                        "description": "To disable the old-style display applications that are hardcoded into\ndatatype classes, set enable_old_display_applications = False.\nThis may be desir..."
                    },
                    "message_box_visible": {
                        "type": "boolean",
                        "default": "",
                        "description": "Show a message box under the masthead.\n"
                    },
                    "message_box_content": {
                        "type": "string",
                        "default": "",
                        "description": "Show a message box under the masthead.\n"
                    },
                    "message_box_class": {
                        "type": "string",
                        "default": "info",
                        "description": "Show a message box under the masthead.\n"
                    },
                    "brand": {
                        "type": "string",
                        "default": "",
                        "description": "Append \"/{brand}\" to the \"Galaxy\" text in the masthead.\n"
                    },
                    "pretty_datetime_format": {
                        "type": "string",
                        "default": "$locale (UTC)",
                        "description": "Format string used when showing date and time information.\nThe string may contain:\n- the directives used by Python time.strftime() function (see\n  htt..."
                    },
                    "default_locale": {
                        "type": "string",
                        "default": "auto",
                        "description": "Default localization for Galaxy UI.\nAllowed values are listed at the end of client/galaxy/scripts/nls/locale.js.\nWith the default value (auto), the lo..."
                    },
                    "galaxy_infrastructure_url": {
                        "type": "string",
                        "default": "http://localhost:8080",
                        "description": "URL (with schema http/https) of the Galaxy instance as accessible within your\nlocal network - if specified used as a default by pulsar file staging an..."
                    },
                    "galaxy_infrastructure_web_port": {
                        "type": "number",
                        "default": 8080,
                        "description": "If the above URL cannot be determined ahead of time in dynamic environments\nbut the port which should be used to access Galaxy can be - this should be..."
                    },
                    "welcome_url": {
                        "type": "string",
                        "default": "/static/welcome.html",
                        "description": "The URL of the page to display in Galaxy's middle pane when loaded.  This can\nbe an absolute or relative URL.\n"
                    },
                    "logo_url": {
                        "type": "string",
                        "default": "/",
                        "description": "The URL linked by the \"Galaxy/brand\" text.\n"
                    },
                    "wiki_url": {
                        "type": "string",
                        "default": "https://galaxyproject.org/",
                        "description": "The URL linked by the \"Wiki\" link in the \"Help\" menu.\n"
                    },
                    "support_url": {
                        "type": "string",
                        "default": "https://galaxyproject.org/support",
                        "description": "The URL linked by the \"Support\" link in the \"Help\" menu.\n"
                    },
                    "biostar_url": {
                        "type": "string",
                        "default": "",
                        "description": "Enable integration with a custom Biostar instance.\n"
                    },
                    "biostar_key_name": {
                        "type": "string",
                        "default": "",
                        "description": "Enable integration with a custom Biostar instance.\n"
                    },
                    "biostar_key": {
                        "type": "string",
                        "default": "",
                        "description": "Enable integration with a custom Biostar instance.\n"
                    },
                    "biostar_enable_bug_reports": {
                        "type": "boolean",
                        "default": true,
                        "description": "Enable integration with a custom Biostar instance.\n"
                    },
                    "biostar_never_authenticate": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable integration with a custom Biostar instance.\n"
                    },
                    "citation_url": {
                        "type": "string",
                        "default": "https://galaxyproject.org/citing-galaxy",
                        "description": "The URL linked by the \"How to Cite Galaxy\" link in the \"Help\" menu.\n"
                    },
                    "search_url": {
                        "type": "string",
                        "default": "https://galaxyproject.org/search/",
                        "description": "The URL linked by the \"Search\" link in the \"Help\" menu.\n"
                    },
                    "mailing_lists_url": {
                        "type": "string",
                        "default": "https://galaxyproject.org/mailing-lists",
                        "description": "The URL linked by the \"Mailing Lists\" link in the \"Help\" menu.\n"
                    },
                    "screencasts_url": {
                        "type": "string",
                        "default": "https://vimeo.com/galaxyproject",
                        "description": "The URL linked by the \"Videos\" link in the \"Help\" menu.\n"
                    },
                    "genomespace_ui_url": {
                        "type": "string",
                        "default": "https://gsui.genomespace.org/jsui/",
                        "description": "Points to the GenomeSpace UI service which will be used by\nthe GenomeSpace importer and exporter tools\n"
                    },
                    "terms_url": {
                        "type": "string",
                        "default": "",
                        "description": "The URL linked by the \"Terms and Conditions\" link in the \"Help\" menu, as well\nas on the user registration and login forms and in the activation emails..."
                    },
                    "qa_url": {
                        "type": "string",
                        "description": "The URL linked by the \"Galaxy Q&A\" link in the \"Help\" menu\nThe Galaxy Q&A site is under development; when the site is done, this URL\nwill be set and u..."
                    },
                    "static_enabled": {
                        "type": "boolean",
                        "default": true,
                        "description": "Serve static content, which must be enabled if you're not serving it via a\nproxy server.  These options should be self explanatory and so are not\ndocu..."
                    },
                    "static_cache_time": {
                        "type": "number",
                        "default": 360,
                        "description": "Serve static content, which must be enabled if you're not serving it via a\nproxy server.  These options should be self explanatory and so are not\ndocu..."
                    },
                    "static_dir": {
                        "type": "string",
                        "default": "static/",
                        "description": "Serve static content, which must be enabled if you're not serving it via a\nproxy server.  These options should be self explanatory and so are not\ndocu..."
                    },
                    "static_images_dir": {
                        "type": "string",
                        "default": "static/images",
                        "description": "Serve static content, which must be enabled if you're not serving it via a\nproxy server.  These options should be self explanatory and so are not\ndocu..."
                    },
                    "static_favicon_dir": {
                        "type": "string",
                        "default": "static/favicon.ico",
                        "description": "Serve static content, which must be enabled if you're not serving it via a\nproxy server.  These options should be self explanatory and so are not\ndocu..."
                    },
                    "static_scripts_dir": {
                        "type": "string",
                        "default": "static/scripts/",
                        "description": "Serve static content, which must be enabled if you're not serving it via a\nproxy server.  These options should be self explanatory and so are not\ndocu..."
                    },
                    "static_style_dir": {
                        "type": "string",
                        "default": "static/june_2007_style/blue",
                        "description": "Serve static content, which must be enabled if you're not serving it via a\nproxy server.  These options should be self explanatory and so are not\ndocu..."
                    },
                    "static_robots_txt": {
                        "type": "string",
                        "default": "static/robots.txt",
                        "description": "Serve static content, which must be enabled if you're not serving it via a\nproxy server.  These options should be self explanatory and so are not\ndocu..."
                    },
                    "display_chunk_size": {
                        "type": "number",
                        "default": 65536,
                        "description": "Incremental Display Options\n"
                    },
                    "apache_xsendfile": {
                        "type": "boolean",
                        "default": "",
                        "description": "For help on configuring the Advanced proxy features, see:\nhttp://usegalaxy.org/production\n\nApache can handle file downloads (Galaxy-to-user) via mod_x..."
                    },
                    "nginx_x_accel_redirect_base": {
                        "type": "string",
                        "default": "",
                        "description": "The same download handling can be done by nginx using X-Accel-Redirect.  This\nshould be set to the path defined in the nginx config as an internal red..."
                    },
                    "upstream_gzip": {
                        "type": "boolean",
                        "default": "",
                        "description": "If using compression in the upstream proxy server, use this option to disable\ngzipping of library .tar.gz and .zip archives, since the proxy server wi..."
                    },
                    "x_frame_options": {
                        "type": "string",
                        "default": "SAMEORIGIN",
                        "description": "The following default adds a header to web request responses that\nwill cause modern web browsers to not allow Galaxy to be embedded in\nthe frames of w..."
                    },
                    "nginx_upload_store": {
                        "type": "string",
                        "default": "",
                        "description": "nginx can also handle file uploads (user-to-Galaxy) via nginx_upload_module.\nConfiguration for this is complex and explained in detail in the\ndocument..."
                    },
                    "nginx_upload_path": {
                        "type": "string",
                        "default": "",
                        "description": "This value overrides the action set on the file upload form, e.g. the web\npath where the nginx_upload_module has been configured to intercept upload\nr..."
                    },
                    "nginx_upload_job_files_store": {
                        "type": "string",
                        "default": "",
                        "description": "Galaxy can also use nginx_upload_module to receive files staged out upon job\ncompletion by remote job runners (i.e. Pulsar) that initiate staging\noper..."
                    },
                    "nginx_upload_job_files_path": {
                        "type": "string",
                        "default": "",
                        "description": "Galaxy can also use nginx_upload_module to receive files staged out upon job\ncompletion by remote job runners (i.e. Pulsar) that initiate staging\noper..."
                    },
                    "chunk_upload_size": {
                        "type": "number",
                        "default": 104857600,
                        "description": "Galaxy can upload user files in chunks without using nginx. Enable the chunk\nuploader by specifying a chunk size larger than 0. The chunk size is spec..."
                    },
                    "dynamic_proxy_manage": {
                        "type": "boolean",
                        "default": true,
                        "description": "Have Galaxy manage dynamic proxy component for routing requests to other\nservices based on Galaxy's session cookie.  It will attempt to do this by\ndef..."
                    },
                    "dynamic_proxy": {
                        "type": "string",
                        "default": "node",
                        "description": "As of 16.04 Galaxy supports multiple proxy types. The original NodeJS\nimplementation, alongside a new Golang single-binary-no-dependencies\nversion. Va..."
                    },
                    "dynamic_proxy_session_map": {
                        "type": "string",
                        "default": "database/session_map.sqlite",
                        "description": "The NodeJS dynamic proxy can use an SQLite database or a JSON file for IPC,\nset that here.\n"
                    },
                    "dynamic_proxy_bind_port": {
                        "type": "number",
                        "default": 8800,
                        "description": "Set the port and IP for the the dynamic proxy to bind to, this must match\nthe external configuration if dynamic_proxy_manage is False.\n"
                    },
                    "dynamic_proxy_bind_ip": {
                        "type": "string",
                        "default": "0.0.0.0",
                        "description": "Set the port and IP for the the dynamic proxy to bind to, this must match\nthe external configuration if dynamic_proxy_manage is False.\n"
                    },
                    "dynamic_proxy_debug": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable verbose debugging of Galaxy-managed dynamic proxy.\n"
                    },
                    "dynamic_proxy_external_proxy": {
                        "type": "boolean",
                        "default": "",
                        "description": "The dynamic proxy is proxied by an external proxy (e.g. apache frontend to\nnodejs to wrap connections in SSL).\n"
                    },
                    "dynamic_proxy_prefix": {
                        "type": "string",
                        "default": "gie_proxy",
                        "description": "Additionally, when the dynamic proxy is proxied by an upstream server, you'll\nwant to specify a prefixed URL so both Galaxy and the proxy reside under..."
                    },
                    "dynamic_proxy_golang_noaccess": {
                        "type": "number",
                        "default": 60,
                        "description": "This attribute governs the minimum length of time between consecutive HTTP/WS\nrequests through the proxy, before the proxy considers a container as be..."
                    },
                    "dynamic_proxy_golang_clean_interval": {
                        "type": "number",
                        "default": 10,
                        "description": "In order to kill containers, the golang proxy has to check at some interval\nfor possibly dead containers. This is exposed as a configurable parameter,..."
                    },
                    "dynamic_proxy_golang_docker_address": {
                        "type": "string",
                        "default": "unix:///var/run/docker.sock",
                        "description": "The golang proxy needs to know how to talk to your docker daemon. Currently\nTLS is not supported, that will come in an update.\n"
                    },
                    "dynamic_proxy_golang_api_key": {
                        "type": "string",
                        "default": "",
                        "description": "The golang proxy uses a RESTful HTTP API for communication with Galaxy\ninstead of a JSON or SQLite file for IPC. If you do not specify this, it will\nb..."
                    },
                    "auto_configure_logging": {
                        "type": "boolean",
                        "default": true,
                        "description": "If True, Galaxy will attempt to configure a simple root logger if a\n\"loggers\" section does not appear in this configuration file.\n"
                    },
                    "log_level": {
                        "type": "string",
                        "default": "DEBUG",
                        "description": "Verbosity of console log messages.  Acceptable values can be found here:\nhttps://docs.python.org/2/library/logging.html#logging-levels\nA custom debug ..."
                    },
                    "logging": {
                        "type": "object",
                        "default": "galaxy.config.LOGGING_CONFIG_DEFAULT",
                        "description": "Controls where and how the server logs messages. If unset, the default is to log all messages to standard\noutput at the level defined by the `log_leve..."
                    },
                    "database_engine_option_echo": {
                        "type": "boolean",
                        "default": "",
                        "description": "Print database operations to the server log (warning, quite verbose!).\n"
                    },
                    "database_engine_option_echo_pool": {
                        "type": "boolean",
                        "default": "",
                        "description": "Print database pool operations to the server log (warning, quite verbose!).\n"
                    },
                    "log_events": {
                        "type": "boolean",
                        "default": true,
                        "description": "Turn on logging of application events and some user events to the database.\n"
                    },
                    "log_actions": {
                        "type": "boolean",
                        "default": true,
                        "description": "Turn on logging of user actions to the database.  Actions currently logged\nare grid views, tool searches, and use of \"recently\" used tools menu.  The\n..."
                    },
                    "fluent_log": {
                        "type": "boolean",
                        "default": "",
                        "description": "Fluentd configuration.  Various events can be logged to the fluentd instance\nconfigured below by enabling fluent_log.\n"
                    },
                    "fluent_host": {
                        "type": "string",
                        "default": "localhost",
                        "description": "Fluentd configuration.  Various events can be logged to the fluentd instance\nconfigured below by enabling fluent_log.\n"
                    },
                    "fluent_port": {
                        "type": "number",
                        "default": 24224,
                        "description": "Fluentd configuration.  Various events can be logged to the fluentd instance\nconfigured below by enabling fluent_log.\n"
                    },
                    "sanitize_all_html": {
                        "type": "boolean",
                        "default": true,
                        "description": "Sanitize all HTML tool output.  By default, all tool output served as\n'text/html' will be sanitized thoroughly.  This can be disabled if you have\nspec..."
                    },
                    "sanitize_whitelist_file": {
                        "type": "string",
                        "default": "config/sanitize_whitelist.txt",
                        "description": "Whitelist sanitization file.\nDatasets created by tools listed in this file are trusted and will not have\ntheir HTML sanitized on display.  This can be..."
                    },
                    "serve_xss_vulnerable_mimetypes": {
                        "type": "boolean",
                        "default": "",
                        "description": "By default Galaxy will serve non-HTML tool output that may potentially\ncontain browser executable JavaScript content as plain text.  This will for\nins..."
                    },
                    "allowed_origin_hostnames": {
                        "type": "string",
                        "default": "",
                        "description": "Return a Access-Control-Allow-Origin response header that matches the Origin\nheader of the request if that Origin hostname matches one of the strings ..."
                    },
                    "trust_jupyter_notebook_conversion": {
                        "type": "boolean",
                        "default": "",
                        "description": "Set the following to True to use Jupyter nbconvert to build HTML from Jupyter\nnotebooks in Galaxy histories.  This process may allow users to execute\n..."
                    },
                    "debug": {
                        "type": "boolean",
                        "default": "",
                        "description": "Debug enables access to various config options useful for development and\ndebugging: use_lint, use_profile, use_printdebug and use_interactive.  It\nal..."
                    },
                    "use_lint": {
                        "type": "boolean",
                        "default": "",
                        "description": "Check for WSGI compliance.\n"
                    },
                    "use_profile": {
                        "type": "boolean",
                        "default": "",
                        "description": "Run the Python profiler on each request.\n"
                    },
                    "use_printdebug": {
                        "type": "boolean",
                        "default": true,
                        "description": "Intercept print statements and show them on the returned page.\n"
                    },
                    "use_interactive": {
                        "type": "boolean",
                        "default": true,
                        "description": "Enable live debugging in your browser.  This should NEVER be enabled on a\npublic site.  Enabled in the sample config for development.\n"
                    },
                    "monitor_thread_join_timeout": {
                        "type": "number",
                        "default": 5,
                        "description": "When stopping Galaxy cleanly, how much time to give various monitoring/polling\nthreads to finish before giving up on joining them. Set to 0 to disable..."
                    },
                    "use_heartbeat": {
                        "type": "boolean",
                        "default": "",
                        "description": "Write thread status periodically to 'heartbeat.log',  (careful, uses disk\nspace rapidly!).  Useful to determine why your processes may be consuming a\n..."
                    },
                    "heartbeat_interval": {
                        "type": "number",
                        "default": 20,
                        "description": "Control the period (in seconds) between dumps. Use -1 to disable. Regardless\nof this setting, if use_heartbeat is enabled, you can send a Galaxy proce..."
                    },
                    "heartbeat_log": {
                        "type": "string",
                        "default": "heartbeat_{server_name}.log",
                        "description": "Heartbeat log filename. Can accept the template variables {server_name} and\n{pid}\n"
                    },
                    "sentry_dsn": {
                        "type": "string",
                        "default": "",
                        "description": "Log to Sentry\nSentry is an open source logging and error aggregation platform.  Setting\nsentry_dsn will enable the Sentry middleware and errors will b..."
                    },
                    "sentry_sloreq_threshold": {
                        "type": "float",
                        "default": "",
                        "description": "Sentry slow request logging.  Requests slower than the threshold\nindicated below will be sent as events to the configured Sentry\nserver (above, sentry..."
                    },
                    "statsd_host": {
                        "type": "string",
                        "description": "Log to statsd\nStatsd is an external statistics aggregator (https://github.com/etsy/statsd)\nEnabling the following options will cause galaxy to log req..."
                    },
                    "statsd_port": {
                        "type": "number",
                        "default": 8125,
                        "description": "Log to statsd\nStatsd is an external statistics aggregator (https://github.com/etsy/statsd)\nEnabling the following options will cause galaxy to log req..."
                    },
                    "statsd_prefix": {
                        "type": "string",
                        "default": "galaxy",
                        "description": "Log to statsd\nStatsd is an external statistics aggregator (https://github.com/etsy/statsd)\nEnabling the following options will cause galaxy to log req..."
                    },
                    "statsd_influxdb": {
                        "type": "boolean",
                        "default": "",
                        "description": "If you are using telegraf to collect these metrics and then sending\nthem to InfluxDB, Galaxy can provide more nicely tagged metrics.\nInstead of sendin..."
                    },
                    "library_import_dir": {
                        "type": "string",
                        "default": "",
                        "description": "Add an option to the library upload form which allows administrators to\nupload a directory of files.\n"
                    },
                    "user_library_import_dir": {
                        "type": "string",
                        "default": "",
                        "description": "Add an option to the library upload form which allows authorized\nnon-administrators to upload a directory of files.  The configured directory\nmust con..."
                    },
                    "user_library_import_dir_auto_creation": {
                        "type": "boolean",
                        "default": "",
                        "description": "If user_library_import_dir is set, this option will auto create a library\nimport directory for every user (based on their email) upon login.\n"
                    },
                    "user_library_import_symlink_whitelist": {
                        "type": "string",
                        "default": "",
                        "description": "For security reasons, users may not import any files that actually lie\noutside of their `user_library_import_dir` (e.g. using symbolic links). A\nlist ..."
                    },
                    "user_library_import_check_permissions": {
                        "type": "boolean",
                        "default": "",
                        "description": "In conjunction or alternatively, Galaxy can restrict user library imports to\nthose files that the user can read (by checking basic unix permissions).\n..."
                    },
                    "allow_path_paste": {
                        "type": "boolean",
                        "default": "",
                        "description": "Allow admins to paste filesystem paths during upload. For libraries this\nadds an option to the admin library upload tool allowing admins to paste\nfile..."
                    },
                    "disable_library_comptypes": {
                        "type": "string",
                        "description": "Users may choose to download multiple files from a library in an archive.  By\ndefault, Galaxy allows users to select from a few different archive form..."
                    },
                    "transfer_manager_port": {
                        "type": "number",
                        "default": 8163,
                        "description": "Some sequencer integration features in beta allow you to automatically\ntransfer datasets.  This is done using a lightweight transfer manager which\nrun..."
                    },
                    "tool_name_boost": {
                        "type": "float",
                        "default": 9,
                        "description": "Boosts are used to customize this instance's toolbox search.\nThe higher the boost, the more importance the scoring algorithm gives to the\ngiven field...."
                    },
                    "tool_section_boost": {
                        "type": "float",
                        "default": 3,
                        "description": "Boosts are used to customize this instance's toolbox search.\nThe higher the boost, the more importance the scoring algorithm gives to the\ngiven field...."
                    },
                    "tool_description_boost": {
                        "type": "float",
                        "default": 2,
                        "description": "Boosts are used to customize this instance's toolbox search.\nThe higher the boost, the more importance the scoring algorithm gives to the\ngiven field...."
                    },
                    "tool_label_boost": {
                        "type": "float",
                        "default": 1,
                        "description": "Boosts are used to customize this instance's toolbox search.\nThe higher the boost, the more importance the scoring algorithm gives to the\ngiven field...."
                    },
                    "tool_stub_boost": {
                        "type": "float",
                        "default": 5,
                        "description": "Boosts are used to customize this instance's toolbox search.\nThe higher the boost, the more importance the scoring algorithm gives to the\ngiven field...."
                    },
                    "tool_help_boost": {
                        "type": "float",
                        "default": 0.5,
                        "description": "Boosts are used to customize this instance's toolbox search.\nThe higher the boost, the more importance the scoring algorithm gives to the\ngiven field...."
                    },
                    "tool_search_limit": {
                        "type": "number",
                        "default": 20,
                        "description": "Limits the number of results in toolbox search.  Can be used to tweak how many\nresults will appear.\n"
                    },
                    "tool_enable_ngram_search": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable/ disable Ngram-search for tools. It makes tool\nsearch results tolerant for spelling mistakes in the query\nby dividing the query into multiple n..."
                    },
                    "tool_ngram_minsize": {
                        "type": "number",
                        "default": 3,
                        "description": "Set minimum size of ngrams\n"
                    },
                    "tool_ngram_maxsize": {
                        "type": "number",
                        "default": 4,
                        "description": "Set maximum size of ngrams\n"
                    },
                    "tool_test_data_directories": {
                        "type": "string",
                        "default": "test-data",
                        "description": "Set tool test data directory. The test framework sets this value to\n'test-data,https://github.com/galaxyproject/galaxy-test-data.git' which will\ncause..."
                    },
                    "id_secret": {
                        "type": "string",
                        "default": "USING THE DEFAULT IS NOT SECURE!",
                        "description": "Galaxy encodes various internal values when these values will be output in\nsome format (for example, in a URL or cookie).  You should set a key to be\n..."
                    },
                    "use_remote_user": {
                        "type": "boolean",
                        "default": "",
                        "description": "User authentication can be delegated to an upstream proxy server (usually\nApache).  The upstream proxy should set a REMOTE_USER header in the request...."
                    },
                    "remote_user_maildomain": {
                        "type": "string",
                        "default": "",
                        "description": "If use_remote_user is enabled and your external authentication\nmethod just returns bare usernames, set a default mail domain to be appended\nto usernam..."
                    },
                    "remote_user_header": {
                        "type": "string",
                        "default": "HTTP_REMOTE_USER",
                        "description": "If use_remote_user is enabled, the header that the upstream proxy provides\nthe remote username in defaults to HTTP_REMOTE_USER (the 'HTTP_' is prepend..."
                    },
                    "remote_user_secret": {
                        "type": "string",
                        "default": "USING THE DEFAULT IS NOT SECURE!",
                        "description": "If use_remote_user is enabled, anyone who can log in to the Galaxy host may\nimpersonate any other user by simply sending the appropriate header.  Thus..."
                    },
                    "remote_user_logout_href": {
                        "type": "string",
                        "default": "",
                        "description": "If use_remote_user is enabled, you can set this to a URL that will log your\nusers out.\n"
                    },
                    "normalize_remote_user_email": {
                        "type": "boolean",
                        "default": "",
                        "description": "If your proxy and/or authentication source does not normalize e-mail\naddresses or user names being passed to Galaxy - set the following option\nto True..."
                    },
                    "single_user": {
                        "type": "string",
                        "description": "If an e-mail address is specified here, it will hijack remote user mechanics\n(``use_remote_user``) and have the webapp inject a single fixed user. Thi..."
                    },
                    "admin_users": {
                        "type": "string",
                        "default": "",
                        "description": "Administrative users - set this to a comma-separated list of valid Galaxy\nusers (email addresses).  These users will have access to the Admin section\n..."
                    },
                    "require_login": {
                        "type": "boolean",
                        "default": "",
                        "description": "Force everyone to log in (disable anonymous access).\n"
                    },
                    "show_welcome_with_login": {
                        "type": "boolean",
                        "default": "",
                        "description": "Show the site's welcome page (see welcome_url) alongside the login page\n(even if require_login is True)\n"
                    },
                    "allow_user_creation": {
                        "type": "boolean",
                        "default": true,
                        "description": "Allow unregistered users to create new accounts (otherwise, they will have to\nbe created by an admin).\n"
                    },
                    "allow_user_deletion": {
                        "type": "boolean",
                        "default": "",
                        "description": "Allow administrators to delete accounts.\n"
                    },
                    "allow_user_impersonation": {
                        "type": "boolean",
                        "default": "",
                        "description": "Allow administrators to log in as other users (useful for debugging)\n"
                    },
                    "show_user_prepopulate_form": {
                        "type": "boolean",
                        "default": "",
                        "description": "When using LDAP for authentication, allow administrators to pre-populate users\nusing an additional form on 'Create new user'\n"
                    },
                    "allow_user_dataset_purge": {
                        "type": "boolean",
                        "default": true,
                        "description": "Allow users to remove their datasets from disk immediately (otherwise,\ndatasets will be removed after a time period specified by an administrator in\nt..."
                    },
                    "new_user_dataset_access_role_default_private": {
                        "type": "boolean",
                        "default": "",
                        "description": "By default, users' data will be public, but setting this to True will cause\nit to be private.  Does not affect existing users and data, only ones crea..."
                    },
                    "expose_user_name": {
                        "type": "boolean",
                        "default": "",
                        "description": "Expose user list.  Setting this to True will expose the user list to\nauthenticated users.  This makes sharing datasets in smaller galaxy instances\nmuc..."
                    },
                    "expose_user_email": {
                        "type": "boolean",
                        "default": "",
                        "description": "Expose user list.  Setting this to True will expose the user list to\nauthenticated users.  This makes sharing datasets in smaller galaxy instances\nmuc..."
                    },
                    "fetch_url_whitelist": {
                        "type": "string",
                        "description": "Whitelist for local network addresses for \"Upload from URL\" dialog.\nBy default, Galaxy will deny access to the local network address space, to\nprevent..."
                    },
                    "enable_beta_gdpr": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enables GDPR Compliance mode. This makes several changes to the way\nGalaxy logs and exposes data externally such as removing emails and\nusernames from..."
                    },
                    "enable_beta_ts_api_install": {
                        "type": "boolean",
                        "default": true,
                        "description": "Enable the new interface for installing tools from Tool Shed\nvia the API. Admin menu will list both if enabled.\n"
                    },
                    "enable_beta_containers_interface": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable the new container interface for Interactive Environments\n"
                    },
                    "tool_submission_burst_threads": {
                        "type": "number",
                        "default": 1,
                        "description": "Set the following to a number of threads greater than 1 to spawn\na Python task queue for dealing with large tool submissions (either\nthrough the tool ..."
                    },
                    "tool_submission_burst_at": {
                        "type": "number",
                        "default": 10,
                        "description": "If tool_submission_burst_threads is set to a number greater than 1, this\nis the number of jobs to schedule at which the task queue will be created.\n"
                    },
                    "enable_beta_workflow_modules": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable beta workflow modules that should not yet be considered part of Galaxy's\nstable API.\n"
                    },
                    "force_beta_workflow_scheduled_min_steps": {
                        "type": "number",
                        "default": 250,
                        "description": "Following options only apply to workflows scheduled using the legacy workflow\nrun API (running workflows via a POST to /api/workflows).\nForce usage of..."
                    },
                    "force_beta_workflow_scheduled_for_collections": {
                        "type": "boolean",
                        "default": "",
                        "description": "Following options only apply to workflows scheduled using the legacy workflow\nrun API (running workflows via a POST to /api/workflows).\nForce usage of..."
                    },
                    "parallelize_workflow_scheduling_within_histories": {
                        "type": "boolean",
                        "default": "",
                        "description": "If multiple job handlers are enabled, allow Galaxy to schedule workflow invocations\nin multiple handlers simultaneously. This is discouraged because i..."
                    },
                    "maximum_workflow_invocation_duration": {
                        "type": "number",
                        "default": 2678400,
                        "description": "This is the maximum amount of time a workflow invocation may stay in an active\nscheduling state in seconds. Set to -1 to disable this maximum and allo..."
                    },
                    "maximum_workflow_jobs_per_scheduling_iteration": {
                        "type": "string",
                        "default": -1,
                        "description": "Specify a maximum number of jobs that any given workflow scheduling iteration can create.\nSet this to a positive integer to prevent large collection j..."
                    },
                    "history_local_serial_workflow_scheduling": {
                        "type": "boolean",
                        "default": "",
                        "description": "Force serial scheduling of workflows within the context of a particular history\n"
                    },
                    "enable_openid": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable authentication via OpenID.  Allows users to log in to their Galaxy\naccount by authenticating with an OpenID provider.\n"
                    },
                    "openid_config_file": {
                        "type": "string",
                        "default": "config/openid_conf.xml",
                        "description": "If OpenID is enabled, this configuration file specifies providers to use.\nFalls back to the .sample variant in config if default does not exist.\n"
                    },
                    "openid_consumer_cache_path": {
                        "type": "string",
                        "default": "database/openid_consumer_cache",
                        "description": "If OpenID is enabled, consumer cache directory to use.\n"
                    },
                    "enable_oidc": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enables and disables OpenID Connect (OIDC) support.\n"
                    },
                    "oidc_config_file": {
                        "type": "string",
                        "default": "config/oidc_config.xml",
                        "description": "Sets the path to OIDC configuration file.\n"
                    },
                    "oidc_backends_config_file": {
                        "type": "string",
                        "default": "config/oidc_backends_config.xml",
                        "description": "Sets the path to OIDC backends configuration file.\n"
                    },
                    "auth_config_file": {
                        "type": "string",
                        "default": "config/auth_conf.xml",
                        "description": "XML config file that allows the use of different authentication providers\n(e.g. LDAP) instead or in addition to local authentication (.sample is used\n..."
                    },
                    "api_allow_run_as": {
                        "type": "string",
                        "default": "",
                        "description": "Optional list of email addresses of API users who can make calls on behalf of\nother users.\n"
                    },
                    "master_api_key": {
                        "type": "string",
                        "default": "changethis",
                        "description": "Master key that allows many API admin actions to be used without actually\nhaving a defined admin user in the database/config.  Only set this if you\nne..."
                    },
                    "enable_tool_tags": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable tool tags (associating tools with tags).  This has its own option\nsince its implementation has a few performance implications on startup for\nla..."
                    },
                    "enable_unique_workflow_defaults": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable a feature when running workflows.  When enabled, default datasets\nare selected for \"Set at Runtime\" inputs from the history such that the\nsame ..."
                    },
                    "myexperiment_url": {
                        "type": "string",
                        "default": "www.myexperiment.org:80",
                        "description": "The URL to the myExperiment instance being used (omit scheme but include port)\n"
                    },
                    "ftp_upload_dir": {
                        "type": "string",
                        "default": "",
                        "description": "Enable Galaxy's \"Upload via FTP\" interface.  You'll need to install and\nconfigure an FTP server (we've used ProFTPd since it can use Galaxy's\ndatabase..."
                    },
                    "ftp_upload_site": {
                        "type": "string",
                        "default": "",
                        "description": "This should be the hostname of your FTP server, which will be provided to\nusers in the help text.\n"
                    },
                    "ftp_upload_dir_identifier": {
                        "type": "string",
                        "default": "email",
                        "description": "User attribute to use as subdirectory in calculating default ftp_upload_dir\npattern. By default this will be email so a user's FTP upload directory wi..."
                    },
                    "ftp_upload_dir_template": {
                        "type": "string",
                        "default": "${ftp_upload_dir}/${ftp_upload_dir_identifier}",
                        "description": "Python string template used to determine an FTP upload directory for a\nparticular user.\n"
                    },
                    "ftp_upload_purge": {
                        "type": "boolean",
                        "default": true,
                        "description": "This should be set to False to prevent Galaxy from deleting uploaded FTP files\nas it imports them.\n"
                    },
                    "enable_quotas": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable enforcement of quotas.  Quotas can be set from the Admin interface.\n"
                    },
                    "expose_dataset_path": {
                        "type": "boolean",
                        "default": "",
                        "description": "This option allows users to see the full path of datasets via the \"View\nDetails\" option in the history. This option also exposes the command line to\nn..."
                    },
                    "expose_potentially_sensitive_job_metrics": {
                        "type": "boolean",
                        "default": "",
                        "description": "This option allows users to see the job metrics (except for environment\nvariables).\n"
                    },
                    "enable_legacy_sample_tracking_api": {
                        "type": "boolean",
                        "default": "",
                        "description": "Enable the API for sample tracking\n"
                    },
                    "enable_data_manager_user_view": {
                        "type": "boolean",
                        "default": "",
                        "description": "Allow non-admin users to view available Data Manager options.\n"
                    },
                    "data_manager_config_file": {
                        "type": "string",
                        "default": "config/data_manager_conf.xml",
                        "description": "File where Data Managers are configured (.sample used if default does not\nexist).\n"
                    },
                    "shed_data_manager_config_file": {
                        "type": "string",
                        "default": "config/shed_data_manager_conf.xml",
                        "description": "File where Tool Shed based Data Managers are configured.\n"
                    },
                    "galaxy_data_manager_data_path": {
                        "type": "string",
                        "default": "tool-data",
                        "description": "Directory to store Data Manager based tool-data; defaults to tool_data_path.\n"
                    },
                    "job_config_file": {
                        "type": "string",
                        "default": "config/job_conf.xml",
                        "description": "To increase performance of job execution and the web interface, you can\nseparate Galaxy into multiple processes.  There are more than one way to do\nth..."
                    },
                    "default_job_resubmission_condition": {
                        "type": "string",
                        "description": "When jobs fail due to job runner problems, Galaxy can be configured to retry\nthese or reroute the jobs to new destinations. Very fine control of this ..."
                    },
                    "track_jobs_in_database": {
                        "type": "boolean",
                        "default": true,
                        "description": "In multiprocess configurations, notification between processes about new jobs\nmust be done via the database.  In single process configurations, this c..."
                    },
                    "use_tasked_jobs": {
                        "type": "boolean",
                        "default": "",
                        "description": "This enables splitting of jobs into tasks, if specified by the particular tool\nconfig.\nThis is a new feature and not recommended for production server..."
                    },
                    "local_task_queue_workers": {
                        "type": "number",
                        "default": 2,
                        "description": "This enables splitting of jobs into tasks, if specified by the particular tool\nconfig.\nThis is a new feature and not recommended for production server..."
                    },
                    "enable_job_recovery": {
                        "type": "boolean",
                        "default": true,
                        "description": "Enable job recovery (if Galaxy is restarted while cluster jobs are running,\nit can \"recover\" them when it starts).  This is not safe to use if you are..."
                    },
                    "retry_metadata_internally": {
                        "type": "boolean",
                        "default": true,
                        "description": "Although it is fairly reliable, setting metadata can occasionally fail.  In\nthese instances, you can choose to retry setting it internally or leave it..."
                    },
                    "max_metadata_value_size": {
                        "type": "number",
                        "default": 5242880,
                        "description": "Very large metadata values can cause Galaxy crashes.  This will allow\nlimiting the maximum metadata key size (in bytes used in memory, not the end\nres..."
                    },
                    "outputs_to_working_directory": {
                        "type": "boolean",
                        "default": "",
                        "description": "This option will override tool output paths to write outputs to the job\nworking directory (instead of to the file_path) and the job manager will move\n..."
                    },
                    "retry_job_output_collection": {
                        "type": "number",
                        "default": "",
                        "description": "If your network filesystem's caching prevents the Galaxy server from seeing\nthe job's stdout and stderr files when it completes, you can retry reading..."
                    },
                    "preserve_python_environment": {
                        "type": "string",
                        "default": "legacy_only",
                        "description": "In the past Galaxy would preserve its Python environment when running jobs (\nand still does for internal tools packaged with Galaxy). This behavior ex..."
                    },
                    "cleanup_job": {
                        "type": "string",
                        "default": "always",
                        "description": "Clean up various bits of jobs left on the filesystem after completion.  These\nbits include the job working directory, external metadata temporary file..."
                    },
                    "drmaa_external_runjob_script": {
                        "type": "string",
                        "default": "sudo -E scripts/drmaa_external_runner.py --assign_all_groups",
                        "description": "When running DRMAA jobs as the Galaxy user\n(https://docs.galaxyproject.org/en/latest/admin/cluster.html#submitting-jobs-as-the-real-user)\nthis script ..."
                    },
                    "drmaa_external_killjob_script": {
                        "type": "string",
                        "default": "sudo -E scripts/drmaa_external_killer.py",
                        "description": "When running DRMAA jobs as the Galaxy user\n(https://docs.galaxyproject.org/en/latest/admin/cluster.html#submitting-jobs-as-the-real-user)\nthis script ..."
                    },
                    "external_chown_script": {
                        "type": "string",
                        "default": "sudo -E scripts/external_chown_script.py",
                        "description": "When running DRMAA jobs as the Galaxy user\n(https://docs.galaxyproject.org/en/latest/admin/cluster.html#submitting-jobs-as-the-real-user)\nthis script ..."
                    },
                    "real_system_username": {
                        "type": "string",
                        "default": "user_email",
                        "description": "When running DRMAA jobs as the Galaxy user\n(https://docs.galaxyproject.org/en/latest/admin/cluster.html#submitting-jobs-as-the-real-user)\nGalaxy can e..."
                    },
                    "environment_setup_file": {
                        "type": "string",
                        "default": "",
                        "description": "File to source to set up the environment when running jobs.  By default, the\nenvironment in which the Galaxy server starts is used when running jobs\nl..."
                    },
                    "job_resource_params_file": {
                        "type": "string",
                        "default": "config/job_resource_params_conf.xml",
                        "description": "Optional file containing job resource data entry fields definition.\nThese fields will be presented to users in the tool forms and allow them to\noverwr..."
                    },
                    "workflow_resource_params_file": {
                        "type": "string",
                        "default": "config/workflow_resource_params_conf.xml",
                        "description": "Similar to the above parameter, workflows can describe parameters used to\ninfluence scheduling of jobs within the workflow. This requires both a descr..."
                    },
                    "workflow_resource_params_mapper": {
                        "type": "string",
                        "default": "config/workflow_resource_mapper_conf.yml",
                        "description": "This parameter describes how to map users and workflows to a set of workflow\nresource parameter to present (typically input IDs from workflow_resource..."
                    },
                    "cache_user_job_count": {
                        "type": "boolean",
                        "default": "",
                        "description": "If using job concurrency limits (configured in job_config_file), several\nextra database queries must be performed to determine the number of jobs a\nus..."
                    },
                    "tool_filters": {
                        "type": "string",
                        "description": "Define toolbox filters (https://galaxyproject.org/user-defined-toolbox-filters/)\nthat admins may use to restrict the tools to display.\n"
                    },
                    "tool_label_filters": {
                        "type": "string",
                        "description": "Define toolbox filters (https://galaxyproject.org/user-defined-toolbox-filters/)\nthat admins may use to restrict the tool labels to display.\n"
                    },
                    "tool_section_filters": {
                        "type": "string",
                        "description": "Define toolbox filters (https://galaxyproject.org/user-defined-toolbox-filters/)\nthat admins may use to restrict the tool sections to display.\n"
                    },
                    "user_tool_filters": {
                        "type": "string",
                        "default": "examples:restrict_upload_to_admins, examples:restrict_encode",
                        "description": "Define toolbox filters (https://galaxyproject.org/user-defined-toolbox-filters/)\nthat users may use to restrict the tools to display.\n"
                    },
                    "user_tool_section_filters": {
                        "type": "string",
                        "default": "examples:restrict_text",
                        "description": "Define toolbox filters (https://galaxyproject.org/user-defined-toolbox-filters/)\nthat users may use to restrict the tool sections to display.\n"
                    },
                    "user_tool_label_filters": {
                        "type": "string",
                        "default": "examples:restrict_upload_to_admins, examples:restrict_encode",
                        "description": "Define toolbox filters (https://galaxyproject.org/user-defined-toolbox-filters/)\nthat users may use to restrict the tool labels to display.\n"
                    },
                    "toolbox_filter_base_modules": {
                        "type": "string",
                        "default": "galaxy.tools.toolbox.filters,galaxy.tools.filters",
                        "description": "The base module(s) that are searched for modules for toolbox filtering\n(https://galaxyproject.org/user-defined-toolbox-filters/) producedures.\n"
                    },
                    "amqp_internal_connection": {
                        "type": "string",
                        "default": "sqlalchemy+sqlite:///./database/control.sqlite?isolation_level=IMMEDIATE",
                        "description": "Galaxy uses AMQP internally for communicating between processes.  For\nexample, when reloading the toolbox or locking job execution, the process\nthat h..."
                    },
                    "enable_communication_server": {
                        "type": "boolean",
                        "default": "",
                        "description": "Galaxy real time communication server settings\n"
                    },
                    "communication_server_host": {
                        "type": "string",
                        "default": "http://localhost",
                        "description": "Galaxy real time communication server settings\n"
                    },
                    "communication_server_port": {
                        "type": "number",
                        "default": 7070,
                        "description": "Galaxy real time communication server settings\n"
                    },
                    "persistent_communication_rooms": {
                        "type": "string",
                        "description": "persistent_communication_rooms is a comma-separated list of rooms that should be always available.\n"
                    }
                }
            }
    };

    constructor(private dialog: MatDialog) {}

}
