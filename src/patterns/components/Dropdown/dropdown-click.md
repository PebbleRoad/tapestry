---
name: Dropdown on click
---
<div class="dropdown"><a href="#" data-toggle="dropdown">Dropdown link</a><em class="caret"></em>
    <ul class="ui-dropdown">
        <li><a href="#">Open</a>
        </li>
        <li><a href="#">Edit</a>
        </li>
        <li class="dropdown dropdown--hover"><a href="#">Move to a list</a>
            <ul class="ui-dropdown">
                <li><a href="#">List 1</a>
                </li>
                <li><a href="#">List 1</a>
                </li>
                <li><a href="#">List 1</a>
                </li>
                <li><a href="#">List 1</a>
                </li>
                <li class="dropdown dropdown--hover"><a href="#">Another nested dropdown</a>
                    <ul class="ui-dropdown">
                        <li><a href="#">List 1</a>
                        </li>
                        <li><a href="#">List 1</a>
                        </li>
                        <li><a href="#">List 1</a>
                        </li>
                        <li><a href="#">List 1</a>
                        </li>
                        <li><a href="#">List 1</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
        <li class="seperator"></li>
        <li><a href="#">Delete</a>
        </li>
    </ul>
</div>
<div class="btn-group">
    <button type="button" data-toggle="dropdown" class="btn btn--warning btn--dropdown">Split dropdown<span class="caret">			</span>
    </button>
    <ul class="ui-dropdown">
        <li><a href="#">Open</a>
        </li>
        <li><a href="#">Edit</a>
        </li>
        <li class="has-dropdown"><a href="#">Move to a list</a>
            <ul class="ui-dropdown">
                <li><a href="#">List 1</a>
                </li>
                <li><a href="#">List 1</a>
                </li>
                <li><a href="#">List 1</a>
                </li>
                <li><a href="#">List 1</a>
                </li>
                <li class="has-dropdown"><a href="#">Another nested dropdown</a>
                    <ul class="ui-dropdown">
                        <li><a href="#">List 1</a>
                        </li>
                        <li><a href="#">List 1</a>
                        </li>
                        <li><a href="#">List 1</a>
                        </li>
                        <li><a href="#">List 1</a>
                        </li>
                        <li><a href="#">List 1</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
        <li class="seperator"></li>
        <li><a href="#">Delete</a>
        </li>
    </ul>
</div>