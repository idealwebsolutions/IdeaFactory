<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet" type="text/css">
    <link href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css" rel="stylesheet">
    <!-- Styles -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav class="navbar is-mobile">
            <div class="navbar-brand">
                <a class="navbar-item" href="{{ url('/') }}">
                    <h5 class="title is-5">{{ config('app.name', 'Laravel') }}</h5>
                </a>
                <div class="navbar-burger burger" data-target="collapsable-nav">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>    
            </div>

            <div class="navbar-menu" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <div class="navbar-start"></div>
                <!-- Right Side Of Navbar -->
                <ul class="navbar-end">
                    <!-- Authentication Links -->
                    @guest
                    <li class="navbar-item">
                        <a class="button" href="{{ route('login') }}">{{ __('Login') }}</a></li>
                    @else
                    <li class="navbar-item">
                        <a href="{{ route('home') }}">Home</a>
                    </li>
                    <li class="navbar-item">
                        <a href="{{ route('discover') }}">Explore</a>
                    </li>
                    <li class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link" href="#" role="button" v-pre>
                            {{ Auth::user()->display_name }}
                            {{-- <div class="media">
                                <figure class="media-left">
                                    <p class="image is-32x32">
                                        <img alt="avatar" src="{{ Auth::user()->avatar }}" />
                                    </p>
                                </figure>
                                <div class="media-content">
                                    <div class="content">
                                        <strong>{{ Auth::user()->display_name }}</strong>
                                    </div>
                                </div>
                            </div> --}}
                        </a>
                        
                        <div class="navbar-dropdown">
                          <a class="navbar-item" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            {{ __('Logout') }}
                          </a>
                          <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                          </form>
                        </div>
                      </li>
                      @endguest
                  </ul>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
</body>
</html>
