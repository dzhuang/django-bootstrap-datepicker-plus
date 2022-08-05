####################
Template Customizing
####################


The calendar is not yet available for customizing, but the input field template can be customized. You can use a custom template for the input field to render.


.. code:: python

    # File: forms.py
    from bootstrap_datepicker_plus.widgets import DatePickerInput
    from django import forms

    class MyDatePickerInput(DatePickerInput):
        template_name = 'my_app/date-picker.html'

    class ToDoForm(forms.Form):
        date = forms.DateField(
            widget=MyDatePickerInput(format='%m/%d/%Y')
        )

Now you have to create a HTML template for date-picker input.

.. code-block:: HTML

    <!-- File: my_app/templates/my_app/date-picker.html -->

    <h5>This is a customized date-picker</h5>
    <div class="input-group date my-custom-class">
        {% include "bootstrap_datepicker_plus/input.html" %}
        <div class="input-group-addon input-group-append">
            <div class="input-group-text"><i class="fa-solid fa-calendar-days"></i></div>
        </div>
    </div>

You can also create a template for TimePickerInput and create a custom time-picker input.

.. code-block:: HTML

    <!-- File: my_app/templates/my_app/time-picker.html -->

    <h5>This is a customized time-picker</h5>
    <div class="input-group date my-custom-class">
        {% include "bootstrap_datepicker_plus/input.html" %}
        <div class="input-group-addon input-group-append">
            <div class="input-group-text"><i class="fa-regular fa-clock"></i></div>
        </div>
    </div>
